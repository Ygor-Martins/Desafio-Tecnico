import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UsersService {
    
    private users = [
    {
        "id": 1,
        "name": "ana",
        "email": "ana@email.com"
    },
    {
        "id": 2,
        "name": "pedro",
        "email": "pedro@email.com"
    }
];

    findAll() {
        return this.users;
    }
    create(createUserDto: CreateUserDto) {
        const newUser = {
  id: this.users.length + 1,
  name: createUserDto.name,
  email: createUserDto.email,
};

    this.users.push(newUser);


    return newUser;
    }
}

