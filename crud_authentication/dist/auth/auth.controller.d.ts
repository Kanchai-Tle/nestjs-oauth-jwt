import { AuthService } from "./auth.service";
import { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: Request, res: Response): Promise<void>;
    getProfile(req: any): any;
}
