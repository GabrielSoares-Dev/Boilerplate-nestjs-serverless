import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@infra/modules/user.module';
import { CryptographyModule } from '@infra/modules/cryptography.module';
import { LoginUseCase } from '@application/useCases/auth/login.usecase';
import { CheckAuthenticationUseCase } from '@application/useCases/auth/checkAuthentication.usecase';
import { AUTH_SERVICE_TOKEN } from '@application/services/auth.service';
import { AuthController } from '@infra/http/controllers/auth.controller';
import { AuthService } from '@infra/services/auth.service';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRES_IN },
    }),
    UserModule,
    CryptographyModule,
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    CheckAuthenticationUseCase,
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: AuthService,
    },
  ],
  exports: [CheckAuthenticationUseCase],
})
export class AuthModule {}
