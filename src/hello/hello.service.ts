import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  getHello(): any {
    return { message: 'Hello Earth, this is Treeo!' };
  }
}
