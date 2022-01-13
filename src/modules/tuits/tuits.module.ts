import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tuit } from './tuit.entity';
// own imports
import { TuitsController } from './tuits.controller';
import { TuitsService } from './tuits.service';

@Module({
    imports: [TypeOrmModule.forFeature([Tuit])],
    controllers: [TuitsController],
    providers: [TuitsService],
})
export class TuitsModule {}
