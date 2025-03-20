import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

import { emitTimerUpdate } from '../socket/route';

const db = new PrismaClient();

export async function POST(req: NextRequest) {
  const { userId, duration, type } = await req.json();

  if (!userId || !duration || !type) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  const timer = await db.timer.create({
    data: {
      userId,
      startTime: new Date(),
      duration,
      type,
      isActive: true,
    },
  });

  emitTimerUpdate(userId, { timerId: timer.id, remainingSeconds: duration, isActive: true, type });

  return NextResponse.json({ message: 'Timer started', timer }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const timerId = searchParams.get('timerId');

  if (!userId || !timerId) {
    return NextResponse.json({ message: 'userId и timerId обязательны' }, { status: 400 });
  }

  const timer = await db.timer.findUnique({ where: { id: timerId } });

  if (!timer || !timer.isActive) {
    return NextResponse.json({ message: 'Timer is not defined or not active' }, { status: 400 });
  }

  const elapsedSeconds = Math.floor((Date.now() - new Date(timer.startTime).getTime()) / 1000);
  const remainingSeconds = Math.max(timer.duration - elapsedSeconds, 0);

  if (remainingSeconds <= 0) {
    await db.timer.update({
      where: { id: timerId },
      data: { isActive: false },
    });

    await db.stat.create({
      data: {
        userId,
        timestamp: new Date(),
        workingTime: timer.type === 'work' ? timer.duration / 60 : 0,
        pauseTime: timer.type === 'pause' ? timer.duration / 60 : 0,
        pomodorosDone: timer.type === 'work' ? 1 : 0,
        skipCount: 0,
      },
    });

    emitTimerUpdate(userId, { timerId, remainingSeconds: 0, isActive: false, type: timer.type });
  }

  return NextResponse.json({ remainingSeconds, isActive: remainingSeconds > 0, type: timer.type });
}
