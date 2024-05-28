import { Module } from '@nestjs/common';
import { UserController } from './user/user/user.controller';
import { UserService } from './user/user/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}