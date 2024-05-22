import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ComplexityPlugin } from './common/plugins/complexity.plugin';
import { HealthModule } from './modules/health/health.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import config from './config/config';
import { LoggingPlugin } from './common/plugins/logging.plugin';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      ignoreEnvFile: false,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: true,
      introspection: true,
      playground: false,
      autoSchemaFile: true,
    }),
    AuthModule,
    HealthModule,
    UsersModule,
  ],
  providers: [ComplexityPlugin, LoggingPlugin],
})
export class AppModule {}
