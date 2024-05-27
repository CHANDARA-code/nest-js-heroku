import { Session } from 'src/api/session/entities/session.entity';
import { User } from 'src/api/users/entities/user.entity';

export type JwtPayloadType = Pick<User, 'id' | 'role'> & {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
