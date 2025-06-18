export type UserDocument = User & Document;
export declare class User {
    id: number;
    username: string;
    email: string;
    password?: string;
    googleId?: string;
    picture?: string;
    firstName?: string;
    lastName?: string;
}
