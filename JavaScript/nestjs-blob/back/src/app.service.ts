import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    async saveFile(buffer: Buffer, name: string): Promise<void> {
        await fs.writeFile(`./out/${name}`, buffer);
    }
}
