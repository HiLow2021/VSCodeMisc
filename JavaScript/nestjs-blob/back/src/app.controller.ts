import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('upload-file')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Body() body: { name: string }, @UploadedFile() file: Express.Multer.File): Promise<void> {
        await this.appService.saveFile(file.buffer, body.name);
    }

    @Post('upload-json')
    async uploadFile2(@Body() body: { name: string; data: number[] }): Promise<void> {
        const buffer = Buffer.from(body.data);

        await this.appService.saveFile(buffer, body.name);
    }
}
