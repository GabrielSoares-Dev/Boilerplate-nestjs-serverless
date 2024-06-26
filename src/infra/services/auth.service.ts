import { Injectable } from '@nestjs/common';
import { AuthServiceInterface } from '@application/services/auth.service';
import { GenerateTokenServiceInputDto } from '@application/dtos/services/auth/generateToken.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(private readonly jwtService: JwtService) {}

  private readonly secret = process.env.JWT_SECRET;

  private readonly expiresIn = process.env.TOKEN_EXPIRES_IN;

  async generateToken(input: GenerateTokenServiceInputDto): Promise<string> {
    const options = {
      secret: this.secret,
      expiresIn: this.expiresIn,
    };

    return this.jwtService.signAsync(input, options);
  }
}
