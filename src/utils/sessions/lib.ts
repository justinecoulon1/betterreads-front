import { SessionOptions } from 'iron-session';
import { UserDto } from '@/utils/dto/user.dto';

export interface SessionData {
  user?: UserDto;
  accessToken?: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'token-session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  },
};
