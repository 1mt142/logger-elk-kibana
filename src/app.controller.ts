import { Controller, Get, Post, Body } from '@nestjs/common';
import { CustomLoggerService } from './logger/logger.service';

@Controller()
export class AppController {
  constructor(private readonly logger: CustomLoggerService) {}

  @Get()
  getHello(): string {
    this.logger.log('Hello endpoint accessed', 'AppController');
    return 'Hello World!';
  }

  @Get('error')
  getError(): string {
    this.logger.error(
      'Test error occurred',
      'Stack trace here',
      'AppController',
    );
    throw new Error('This is a test error');
  }

  @Post('users')
  createUser(@Body() userData: any): any {
    this.logger.log(
      `Creating user: ${JSON.stringify(userData)}`,
      'AppController',
    );
    this.logger.warn('User creation without validation', 'AppController');
    return { id: 1, ...userData };
  }
}
