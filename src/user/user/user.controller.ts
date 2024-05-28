import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  addUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phoneNumber') phoneNumber: string,
    @Body('address') address: string,
  ) {
    return this.userService.addUser(name, email, phoneNumber, address);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phoneNumber') phoneNumber: string,
    @Body('address') address: string,
  ) {
    return this.userService.updateUser(id, name, email, phoneNumber, address);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    this.userService.deleteUser(id);
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id/pdf')
  generatePDF(@Param('id') id: number, @Res() res: Response) {
    const filePath = this.userService.generatePDF(id);
    res.download(filePath);
  }
}
