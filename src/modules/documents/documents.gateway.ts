import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // ⚠️ set frontend URL in production
  },
})
export class DocumentsGateway {
  @WebSocketServer()
  server: Server;

  // When user joins a document
  @SubscribeMessage('joinDocument')
  handleJoin(
    @MessageBody() data: { docId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.docId);
    this.server
      .to(data.docId)
      .emit('userJoined', { userId: data.userId, docId: data.docId });

    console.log(`User ${data.userId} joined document ${data.docId}`);
  }

  // When user edits a document
  @SubscribeMessage('editDocument')
  handleEdit(
    @MessageBody() data: { docId: string; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    // Broadcast to all users in this doc room
    client.to(data.docId).emit('receiveEdit', { content: data.content });

    console.log(`Edit in document ${data.docId}: ${data.content}`);
  }
}
