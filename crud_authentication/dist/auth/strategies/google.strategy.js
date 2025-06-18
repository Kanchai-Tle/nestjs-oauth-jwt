"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const common_1 = require("@nestjs/common");
let GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor() {
        if (!process.env.GOOGLE_CLIENT_ID) {
            throw new Error('GOOGLE_CLIENT_ID is not defined in environment variables.');
        }
        if (!process.env.GOOGLE_CLIENT_SECRET) {
            throw new Error('GOOGLE_CLIENT_SECRET is not defined in environment variables.');
        }
        if (!process.env.GOOGLE_CALLBACK_URL) {
            throw new Error('GOOGLE_CALLBACK_URL is not defined in environment variables.');
        }
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile'],
            passReqToCallback: false,
        });
    }
    async validate(accessToken, refreshToken, profile, done) {
        const { id, name, emails, photos } = profile;
        const email = emails?.[0]?.value;
        const picture = photos?.[0]?.value;
        if (!email) {
            return done(new Error("Google profile has no email."), undefined);
        }
        const userProfile = {
            googleId: id,
            email: email,
            firstName: name?.givenName || null,
            lastName: name?.familyName || null,
            picture: picture || null,
        };
        done(null, userProfile);
    }
};
exports.GoogleStrategy = GoogleStrategy;
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GoogleStrategy);
//# sourceMappingURL=google.strategy.js.map