import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/shared/lib/prisma';

export async function POST(request: NextRequest) {
  const stat = await request.json();
  const newStat = await prisma.stat.create({ data: stat });
  return NextResponse.json(newStat);
}
