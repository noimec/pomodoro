import { NextApiResponse } from 'next';
import { Server } from 'socket.io';

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

let io: Server | null = null;

export async function GET(req: Request, res: NextApiResponse) {
  if (!io) {
    const httpServer = (res as any).socket.server;
    io = new Server(httpServer, {
      path: '/api/socket',
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('join', (userId: string) => {
        socket.join(userId);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }

  return new Response('Socket.IO server started', { status: 200 });
}

export function emitTimerUpdate(userId: string, timerData: any) {
  if (io) {
    io.to(userId).emit('timerUpdate', timerData);
  }
}
