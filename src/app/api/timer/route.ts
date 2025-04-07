import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/shared/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ message: 'userId is required' }, { status: 400 });
  }

  const timer = await prisma.timer.findFirst({
    where: { userId, isActive: true },
    orderBy: { startTime: 'desc' },
  });

  if (!timer) {
    return NextResponse.json({ message: 'No active timer found' }, { status: 404 });
  }

  const elapsedSeconds = Math.floor((Date.now() - new Date(timer.startTime).getTime()) / 1000);
  const remainingSeconds = Math.max(timer.duration - elapsedSeconds, 0);

  return NextResponse.json({
    timerId: timer.id,
    remainingSeconds,
    isActive: timer.isActive,
    type: timer.type,
    isPaused: !!timer.pausedAt,
  });
}
