import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(
        email: string,
        pass: string,
    ): Promise<{ access_token: string, user: User }> {
        const user = await this.usersService.user({ email, password: pass });
        const payload = { sub: user.id, username: user.name };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user
        };
    }

    async signUp(
        email: string,
        password: string,
        name: string,
        role: Role,
    ): Promise<{ access_token: string, user: User }> {

        const user = await this.usersService.createUser({ email, password, name, role })


        const payload = { sub: user.id, username: user.name };

        return {
            user,
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    getAllUsers() {
        this.usersService.users({})
    }
}