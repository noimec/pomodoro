import { NextResponse } from 'next/server';
import prisma from '@/shared/lib/prisma';

export async function POST(request: Request) {
  const { userId, duration, type } = await request.json();
  const timer = await prisma.timer.create({
    data: {
      userId,
      startTime: new Date(),
      duration,
      isActive: true,
      type,
    },
  });
  return NextResponse.json({ timer });
}

export async function PATCH(request: Request) {
  const { timerId, action } = await request.json();
  if (action === 'pause') {
    const timer = await prisma.timer.update({
      where: { id: timerId },
      data: { isActive: false, pausedAt: new Date() },
    });
    return NextResponse.json({ timer });
  }
  if (action === 'resume') {
    const timer = await prisma.timer.update({
      where: { id: timerId },
      data: { isActive: true, pausedAt: null },
    });
    return NextResponse.json({ timer });
  }
  return NextResponse.error();
}
