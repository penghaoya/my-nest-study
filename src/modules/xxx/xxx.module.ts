import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: 'xxx',
      useValue: 'Xxx',
    },
  ],
  exports: ['xxx'],
})
export class XxxModule {}
