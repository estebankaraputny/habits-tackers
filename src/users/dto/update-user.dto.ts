import { Role } from '../../common/types/user.type';


export class UpdateUserDto {
    username: string;
    email:string;
    roles?: Role[] = [Role.USER];
}

