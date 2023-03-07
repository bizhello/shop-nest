import { allowedCors } from '../common/constants';
import { MessagesEnum } from '../common/enums';

export default {
  credentials: true,
  origin(origin, callback) {
    if (allowedCors.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(MessagesEnum.CORS));
    }
  },
};
