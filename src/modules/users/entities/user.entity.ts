import { Tuit } from 'src/modules/tuits/tuit.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;

    @OneToMany((type) => Tuit, (tuit) => tuit.user)
    tuits: Tuit[];

    @CreateDateColumn()
    createdAt: Date;
}
