import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/shared/lib/prisma';

export async function POST(request: NextRequest) {
  const { userId, taskId, duration, type } = await request.json();
  const timer = await prisma.timer.create({
    data: {
      userId,
      taskId,
      duration,
      type,
      isActive: true,
      startTime: new Date(),
    },
  });
  return NextResponse.json(timer);
}

export async function PATCH(request: NextRequest) {
  const { id, action } = await request.json();
  if (action === 'pause') {
    const timer = await prisma.timer.update({
      where: { id },
      data: { isActive: false, pausedAt: new Date() },
    });
    return NextResponse.json(timer);
  }
  if (action === 'resume') {
    const timer = await prisma.timer.update({
      where: { id },
      data: { isActive: true, pausedAt: null },
    });
    return NextResponse.json(timer);
  }
  if (action === 'skip' || action === 'complete') {
    const timer = await prisma.timer.update({
      where: { id },
      data: { isActive: false },
    });
    return NextResponse.json(timer);
  }
}
