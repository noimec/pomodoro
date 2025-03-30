import { COOKIES_HOURS_ACCESS, EXPIRES_HOURS_ACCESS, serverMessages, statusCodes } from "@/shared/config";
import { PrismaClient } from "@prisma/client";
import { jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

const { UNAUTHORIZED } = statusCodes
const { REFRESH_TOKEN_MISSING, INVALID_REFRESH_TOKEN, REFRESH_TOKEN_EXPIRED } = serverMessages
const accessSecret = new TextEncoder().encode(process.env.ACCESS_SECRET)
const refreshSecret = new TextEncoder().encode(process.env.REFRESH_SECRET)

const db = new PrismaClient();

export async function POST(req: NextRequest) {
    const refreshToken = req.cookies.get('refreshToken')?.value

    if (!refreshToken) {
        return NextResponse.json(REFRESH_TOKEN_MISSING, { status: UNAUTHORIZED })
    }

    try {
        const { payload } = await jwtVerify(
            refreshToken,
            refreshSecret
        );

        const storedToken = await db.refreshToken.findUnique({
            where: { token: refreshToken }
        });

        if (!storedToken || new Date() > storedToken.expiresAt) {
            throw new Error(REFRESH_TOKEN_EXPIRED);
        }

        const newAccessToken = await new SignJWT({ userId: payload.userId })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime(EXPIRES_HOURS_ACCESS)
            .sign(accessSecret);

        const response = NextResponse.json({ success: true });
        response.cookies.set('access_token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: COOKIES_HOURS_ACCESS
        });

        return response;
    } catch (error) {
        const response = NextResponse.json(
            { message: INVALID_REFRESH_TOKEN },
            { status: UNAUTHORIZED }
        );
        response.cookies.delete('access_token');
        response.cookies.delete('refresh_token');
        return response;
    }
}