import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT:number = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT,()=>{
    console.log(`app is running on http://localhost:${PORT}`);
  })
}
bootstrap();
