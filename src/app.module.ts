import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HabitsModule } from './habits/habits.module';
import { AuthModule } from './auth/auth.module';
import { FriendsModule } from './friends/friends.module';
import { ChallengesModule } from './challenges/challenges.module';


@Module({
  imports: [UsersModule, HabitsModule, AuthModule, FriendsModule, ChallengesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
