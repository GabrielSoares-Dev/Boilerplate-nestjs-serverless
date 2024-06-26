import { Injectable } from '@nestjs/common';
import { AuthServiceInterface } from '@application/services/auth.service';
import { GenerateTokenServiceInputDto } from '@application/dtos/services/auth/generateToken.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(input: GenerateTokenServiceInputDto): Promise<string> {
    return this.jwtService.signAsync(input);
  }
}
