import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { UploadDto } from './upload.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Post('upload-file')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Body() body: UploadDto, @UploadedFile() file: Express.Multer.File): Promise<void> {
        await this.appService.saveFile(file.buffer, body.name);
    }

    @Post('upload-json')
    async uploadFile2(@Body() body: { data: number[] }): Promise<void> {
        const buffer = Buffer.from(body.data);

        await this.appService.saveFile(buffer, 'test.png');
    }
}
