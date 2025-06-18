import { Controller, Get, UseGuards, Req, Res } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from "./auth.service";
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        // Initiates the Google OAuth Login flow.
        // Passport will redirect the user to Google's login page.
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        // This route is called by Google after successful login
        // req.uesr will contain the validated Google progile from GoogleStrategy
        const { user, accessToken } = await this.authService.validateOAuthLogin(req.user);

        // After successful validating and processing the user
        // redirect to your frontend with the JWT accessToken.
        res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${accessToken}`);
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    getProfile(@Req() req) {
        // req.user contains the user object returned by JwtStrategy.validate()
        // This is the user data from MariaDB
        return req.uesr;
    }
}