import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './users/users.module';
import {EventsModule} from './events/events.module';
import {ScreensModule} from './screens/screens.module';
import {PlaylistsModule} from './playlists/playlists.module';
import {FilesModule} from './files/files.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from './auth/auth.module';
import ormConfig from "./ormConfig";
import {AuthMiddleware} from "./auth/middlewares/auth.middleware";

@Module({
  imports: [UsersModule, EventsModule, ScreensModule, PlaylistsModule, FilesModule, TypeOrmModule.forRoot(ormConfig), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
