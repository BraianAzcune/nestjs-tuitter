import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
// own imports
import { TuitsService } from './tuits.service';
import { Tuit } from './tuit.entity';
import { CreateTuitDto, PaginationQueryDto, UpdateTuitDto } from './dto';

@Controller('tuits')
export class TuitsController {
    constructor(private readonly tuitService: TuitsService) {}

    @Get()
    getTuits(
        @Query() paginationfilterQuery: PaginationQueryDto,
    ): Promise<Tuit[]> {
        return this.tuitService.getTuits(paginationfilterQuery);
    }

    @Get(':id')
    async GetTuits(@Param('id') id: number): Promise<Tuit> {
        const tuit = await this.tuitService.getTuit(id);
        if (!tuit) {
            throw new NotFoundException();
        }
        return tuit;
    }

    @Post()
    async createTuit(@Body() msg: CreateTuitDto) {
        if (!(await this.tuitService.createTuit(msg))) {
            throw new ConflictException();
        }
    }

    @Patch(':id')
    async updateTuit(@Param('id') id: number, @Body() body: UpdateTuitDto) {
        if (!(await this.tuitService.updateTuit(id, body))) {
            throw new NotFoundException();
        }
    }

    @Delete(':id')
    async deleteTuit(@Param('id') id: number) {
        if (!(await this.tuitService.deleteTuit(id))) {
            throw new NotFoundException();
        }
    }
}
