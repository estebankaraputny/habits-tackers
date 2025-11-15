import {
    Controller,
    Get, 
    Post,
    Put,
    Delete,
    Body,

} from '@nestjs/common';
import { UsersService} from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users') //Endpoint base
export class UsersController{
    constructor(private readonly userServicie: UsersService){} //Inyeccion de dependencia


    // @Get() // Endpoint: GET /users
    // async getAllUsers(){
    //     return await this.userServicie.getAllUsers();
    // }

    @Post()
    create(@Body() createUserDto: CreateUserDto){
        return{
            message: 'Hecho',
            data: createUserDto, 
    };
    }
}