import { Requester } from '../common/interfaces/common.interface';

declare global {
  namespace Express {
    interface Request {
      user: Requester;
    }
  }
}
