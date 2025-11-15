import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HabitsModule } from './habits/habits.module';
import { AuthModule } from './auth/auth.module';
import { FriendsModule } from './friends/friends.module';
import { ChallengesModule } from './challenges/challenges.module';
import { TasksModule } from './tasks/tasks.module';
import { GatewayModule } from './gateway/gateway.module';


@Module({
  imports: [UsersModule, HabitsModule, AuthModule, FriendsModule, ChallengesModule, TasksModule, GatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
