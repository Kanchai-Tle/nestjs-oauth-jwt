import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRespository: Repository<User>,
    ){}

    async create(userData: Partial<User>): Promise<User> {
        const newUser = this.userRespository.create(userData)
        return this.userRespository.save(newUser);
    }

    async findAll(): Promise<User[]> {
        return this.userRespository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRespository.findOne({where: { id }});
        if(!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRespository.findOne({ where: { email } });
    }

    async findByGoogleId(googleId: string): Promise<User | null> {
        return this.userRespository.findOne({ where: { googleId } });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        await this.userRespository.update(id, updateUserDto);
        if(!id) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return this.findOne(id);
    }

    async remove(id:number): Promise<void> {
        const result = await this.userRespository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}
