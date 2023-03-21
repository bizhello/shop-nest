import { Request } from 'express';
import { Types } from 'mongoose';

interface IExpressRequest extends Request {
  userId?: Types.ObjectId;
}

export default IExpressRequest;
