import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ message: 'Все поля обязательны' }, { status: 400 });
    }

    const existingUser = await db.user.findUnique({ where: { username } });

    if (existingUser) {
      return NextResponse.json({ message: 'Пользователь уже существует' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: { username, password: hashedPassword },
    });

    return NextResponse.json({ message: 'Регистрация успешна', user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
