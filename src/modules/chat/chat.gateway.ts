import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrismaService } from 'src/common/prisma/prisma.service';


@WebSocketGateway({
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: { chatRoomId: string; senderId: string; text: string }) {
    console.log('Received message:', data);  // <-- should appear in NestJS console
    this.server.emit('message', data);       // <-- broadcasts to all clients
  }
}

