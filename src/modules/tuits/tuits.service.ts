import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTuitDto, PaginationQueryDto, UpdateTuitDto } from './dto';
// own imports
import { Tuit } from './tuit.entity';

@Injectable()
export class TuitsService {
    constructor(
        @InjectRepository(Tuit)
        private readonly tuitRepository: Repository<Tuit>,
    ) {}

    async getTuits(pagination: PaginationQueryDto): Promise<Tuit[]> {
        const query = this.tuitRepository.createQueryBuilder('tuit');
        query.leftJoinAndSelect('tuit.user', 'user');
        //todo: testear offset y limit
        console.log('offset', pagination?.offset);

        query.skip(pagination?.offset);
        query.take(pagination?.limit);

        if (pagination.searchTerm) {
            //TODO: puede haber una vulnerabilidad aqui.
            query.where('tuit.message ILIKE :searchTerm', {
                searchTerm: `%${pagination.searchTerm}%`,
            });
        }

        if (pagination.orderBy) {
            query.addOrderBy(pagination.orderBy);
        }
        // TODO: si el orderby es invalido, esto tira un 500, se debe crear una clase manejadora de errores.
        return await query.getMany();
    }
    async getTuit(id: number): Promise<Tuit> {
        //findOne retorna undefined si no encuentra el id.
        return await this.tuitRepository.findOne(id, { relations: ['user'] });
    }
    async createTuit({ message }: CreateTuitDto): Promise<boolean> {
        const tuit: Tuit = this.tuitRepository.create({ message });
        await this.tuitRepository.save(tuit);
        return true;
    }
    async updateTuit(id: number, { message }: UpdateTuitDto): Promise<boolean> {
        const tuit: Tuit = await this.tuitRepository.preload({ id, message });
        if (!tuit) {
            return false;
        }
        return true;
    }
    async deleteTuit(id: number): Promise<boolean> {
        const tuit: Tuit = await this.tuitRepository.findOne(id);
        if (!tuit) {
            return false;
        }
        this.tuitRepository.remove(tuit);
        return true;
    }
}
