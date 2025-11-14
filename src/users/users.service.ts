import {
    Injectable,
} from '@nestjs/common';

@Injectable()
export class UsersService{

    private users = [
            {id:1, name:'Esteban', email:'esteban@l.com'},
            {id:2, name:'Juan', email:'esteban@l.com'},
            {id:3, name:'Pedro',  email:'esteban@l.com'}
        ];

    async getAllUsers(){
        return this.users;
    }
}