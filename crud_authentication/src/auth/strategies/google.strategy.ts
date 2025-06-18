import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    // เพิ่มการตรวจสอบค่าก่อนใช้งาน เพื่อให้มั่นใจว่าไม่ได้เป็น undefined
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

    async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
): Promise<any> {
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

}
