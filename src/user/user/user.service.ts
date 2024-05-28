import { Injectable, NotFoundException } from '@nestjs/common';
import PDFDocument from 'pdfkit';
import * as fs from 'fs';

export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

@Injectable()
export class UserService {
  private users: User[] = [];
  private idCounter = 1;

  addUser(name: string, email: string, phoneNumber: string, address: string): User {
    const user = { id: this.idCounter++, name, email, phoneNumber, address };
    this.users.push(user);
    return user;
  }

  updateUser(id: number, name: string, email: string, phoneNumber: string, address: string): User {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = { id, name, email, phoneNumber, address };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  deleteUser(id: number): void {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    this.users.splice(userIndex, 1);
  }

  getUser(id: number): User {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  getAllUsers(): User[] {
    return this.users;
  }

  generatePDF(userId: number): string {
    const user = this.getUser(userId);

    const doc = new PDFDocument();
    const fileName = `user_${userId}.pdf`;
    const filePath = `./${fileName}`;
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(25).text('User Details', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Name: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Phone Number: ${user.phoneNumber}`);
    doc.text(`Address: ${user.address}`);

    doc.end();

    return filePath;
  }
}
