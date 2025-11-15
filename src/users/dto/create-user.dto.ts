import { Role } from '../../common/types/user.type';


export class CreateUserDto {
    username: string;
    email:string;
    roles?: Role[] = [Role.USER];
}

