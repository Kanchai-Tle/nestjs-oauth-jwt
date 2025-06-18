import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UsersService } from "src/users/users.service";
import { User } from '../users/user.entity'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    //Google Authentication
    async validateOAuthLogin(profile: any): Promise<{ user: User, accessToken: string }> {
        try {
            let user: User | null = null;
            let email: string | undefined;

            if (profile.emails && profile.emails.length > 0) {
                email = profile.emails[0].value;
            } else if (profile.email) { // Fallback กรณี profile มี field email โดยตรง
                email = profile.email;
            }
            if (!email) {
                // ถ้าไม่สามารถดึงอีเมลจาก profile ได้ ให้โยน UnauthorizedException
                throw new UnauthorizedException('OAuth profile ไม่ได้ให้ที่อยู่อีเมลมา.');
            }

            if (profile.googleId) {
                user = await this.userService.findByGoogleId(profile.googleId);
            }

            // 2. ถ้ายังไม่พบผู้ใช้ด้วย Google ID ให้ลองหาด้วย Email
            //    กรณีนี้อาจเกิดขึ้นหากผู้ใช้เคยลงทะเบียนด้วยอีเมลเดียวกันนี้ในระบบอื่น (ไม่ใช่ Google OAuth)
            if (!user) {
                user = await this.userService.findByEmail(email); // ใช้ email ที่ดึงมาอย่างปลอดภัย
            }

            if (user && !user.googleId) {
                    user.googleId = profile.googleId;
                    user.picture = profile.picture;
                    user.firstName = profile.firstName;
                    user.lastName = profile.lastName;
                await this.userService.create(user);
                } else if (!user) {
                    user = await this.userService.create({
                        username: profile.firstName || profile.email.split('@')[0],
                        email: profile.email,
                        googleId: profile.googleId,
                        picture: profile.picture,
                        firstName: profile.firstName,
                        lastName: profile.lastName,

                    });
                }

                // Check if the creating user is success
                if (!user) {
                    throw new UnauthorizedException('Failed to process user from OAuth.');
                }

                // Create JWT Payload
                const payload = {
                    email: user.email,
                    sub: user.id,
                    roles: ['user'],
                };

                const accessToken = this.jwtService.sign(payload);

                return {user, accessToken};
        } catch (error) {
            console.error("Error validating OAuth login:", error);
            throw new UnauthorizedException("Failed to validate OAuth login")
        }
    }

    // for JWT Strategy (for check the token)
    async validateUser(payload: any): Promise<User | undefined> {
        return this.userService.findOne(payload.sub);
    }
}
