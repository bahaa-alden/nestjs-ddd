import { Socket } from 'socket.io';
import { User } from '../../users/domain/user';

export type ISocketWithUser = Socket & {
  user: User;
};
