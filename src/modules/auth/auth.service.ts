import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: registerDto.email },
      });
      if (existingUser) throw new BadRequestException('Email already exists');

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const user = await this.prisma.user.create({
        data: { name: registerDto.name, email: registerDto.email, password: hashedPassword },
      });
      return { id: user.id, name: user.name, email: user.email };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: loginDto.email },
      });
      if (!user) throw new UnauthorizedException('Invalid credentials');

      const isValid = await bcrypt.compare(loginDto.password, user.password);
      if (!isValid) throw new UnauthorizedException('Invalid credentials');

      const token = this.jwtService.sign({ sub: user.id, email: user.email });
      return { token };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
