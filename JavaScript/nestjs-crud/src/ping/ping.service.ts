import { Injectable } from '@nestjs/common';

@Injectable()
export class PingService {
    ping(): string {
        return 'Hello Nest.js!';
    }
}
