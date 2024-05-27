import { Session } from 'src/api/session/entities/session.entity';

export type JwtRefreshPayloadType = {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
