import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService} from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { Role } from 'src/common/types/user.types';
import { Roles } from 'src/common/decorators/roles.decorator';
@Controller('users') //Endpoint base
export class UsersController{
    constructor(private readonly userServicie: UsersService){} //Inyeccion de dependencia


    // @Get() // Endpoint: GET /users
    // async getAllUsers(){
    //     return await this.userServicie.getAllUsers();
    // }
    @ApiOperation({ summary: 'Create user no have token' })
    @Public()
    @Post()
    create(@Body() createUserDto: CreateUserDto){
        return{
            return this.usersServicie.create(createUserDto); 
    };
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.USER,Role.ADMIN)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.USER,Role.FOUNDATION)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}