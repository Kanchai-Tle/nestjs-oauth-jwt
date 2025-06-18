import { JwtService } from '@nestjs/jwt';
import { UsersService } from "src/users/users.service";
import { User } from '../users/user.entity';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    validateOAuthLogin(profile: any): Promise<{
        user: User;
        accessToken: string;
    }>;
    validateUser(payload: any): Promise<User | undefined>;
}
