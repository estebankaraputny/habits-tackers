import {
    Controller,
    Get, 
    Post,
    Put,
    Delete,

} from '@nestjs/common';

import { UsersService} from './users.service';

@Controller('users') //Endpoint base
export class UsersController{
    constructor(private readonly userServicie: UsersService){} //Inyeccion de dependencia


    @Get() // Endpoint: GET /users
    async getAllUsers(){
        return await this.userServicie.getAllUsers();
    }

}