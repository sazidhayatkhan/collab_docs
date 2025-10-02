import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 6000;
  await app.listen(port);

  const url = await app.getUrl();
  console.log(`🚀 Server is running on http://localhost:${port}`);
}
bootstrap();

