import { NextRequest, NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export async function POST(req: NextRequest) {
  const { userId, title, pomodoros } = await req.json();

  const task = await db.task.create({ data: { title, userId, pomodoros } });

  return NextResponse.json({ message: 'Task created', task }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  const tasks = await db.task.findMany({
    where: userId ? { userId } : undefined,
  });

  return NextResponse.json(tasks);
}
