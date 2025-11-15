import {
    Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService{

    // private users = [
    //         {id:1, name:'Esteban', email:'esteban@l.com'},
    //         {id:2, name:'Juan', email:'esteban@l.com'},
    //         {id:3, name:'Pedro',  email:'esteban@l.com'}
    //     ];

    // async getAllUsers(){
    //     return this.users;
    // }

    // create(createUserDto: CreateUserDto){
    //     return {
    //         ...createUserDto,
    //     }
    // }
    try {
        //Validar el email
        const existingUser = await this.prisma.user.findUnique({
        where: {
          email: createUserDto.email,
        },
      })
      if (existingUser) {
        throw new BadRequestException('Email is already registered');
      }

      //Crear el usuario
      const newID = uuidv4();
      console.log(createUserDto);
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
      const user = await this.prisma.user.create({
        data: {
          id: newID,
          name: createUserDto.name,
          email: createUserDto.email,
          password: hashedPassword,
          role: createUserDto.role || 'USER',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
        if ((createUserDto.role || 'USER') === 'USER') {
        await this.prisma.userProfile.create({
          data: { userId: user.id }, // campos opcionales quedan vacíos
        });
      }
      // return whitout password
      const { password, ...userWithoutPassword } = user;
      return ({
        ...userWithoutPassword,
      });
    
    } catch (error) {
        console.error('Error creating user:', error);
      throw error; // re-lanza la excepción para que NestJS la maneje
    }

   public async findAll() {
    const findAllUsers = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })
    return findAllUsers.map(user => ({
      ...user,
    }));
  }

  public async findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid UUID format for id: ${id}`);
    }

    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid UUID format for id: ${id}`);
    }

    try {
      // Verificar que el usuario exista
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      // Evitar que se actualicen campos sensibles como "id" o "role" desde el DTO
      const { password, ...allowedUpdates } = updateUserDto;

      // Preparar los datos a actualizar
      const dataToUpdate: any = { ...allowedUpdates, updatedAt: new Date() };

      // Si se incluye una contraseña, la encriptamos
      if (updateUserDto.password) {
        dataToUpdate.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      // Realizar actualización
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: dataToUpdate,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          updatedAt: true,
        },
      });

      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  public async remove(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid UUID format for id: ${id}`);
    }

    try {

      // Verificar que exista
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      // Eliminar
      await this.prisma.user.delete({
        where: { id },
      });

      return { message: `User with id ${id} has been deleted.` };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error; // re-lanza la excepción para que NestJS la maneje
    }
  } 
}