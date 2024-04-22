import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';
import { writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('profilePicture'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log('file', file);
    if (file) {
      // Save the uploaded file to a temporary file
      // so that we can upload it to Cloudinary
      const tempFilePath = join(tmpdir(), file.originalname);
      writeFileSync(tempFilePath, file.buffer);

      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(tempFilePath, {
        public_id: file.filename,
        folder: 'profile-pictures',
      });

      // Save the URL of the uploaded image to updateUserDto.profilePicture
      updateUserDto.profilePicture = result.url;
    }
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
