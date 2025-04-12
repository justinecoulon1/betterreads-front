import { NextRequest, NextResponse } from 'next/server';
import UserService from '@/utils/api/user.service';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '@/utils/session/lib';

export async function POST(req: NextRequest) {
  console.log(req.cookies);
  const session = await getIronSession<SessionData>(req, NextResponse.next(), sessionOptions);

  try {
    const refreshToken = session.refreshToken;
    if (!refreshToken) {
      return new NextResponse(JSON.stringify({ message: 'missing_refresh_token' }), { status: 401 });
    }
    const refreshResponse = await UserService.refresh(refreshToken);
    session.accessToken = refreshResponse.accessToken;
    session.refreshToken = refreshResponse.refreshToken;
    session.user = refreshResponse.user;
    await session.save();
    console.log('NEW SESSION:', session);
    return Response.json({});
  } catch (err) {
    console.error('Failed to refresh token:', err);
    return new NextResponse(JSON.stringify({ message: 'refresh_token_failed' }), { status: 401 });
  }
}
