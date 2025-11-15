import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() loginDto: LoginDto) {
    const userToken = await this.authService.validateUser(loginDto);
        if (!userToken) {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }
        return userToken;
  }

  @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('me')
    getProfile(@Req() req) {
        return {
            id: req.user.id,
            email: req.user.email,
            role: req.user.role,
        };
    }
  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
