/**
 * Created by cahyo on 7/29/17.
 */
import ENV from '../config/environment';
export default function (param = null) {
  let offset = ENV.APP.DEFAULT_OFFSET;
  if (param != null) {
    offset = param;
  }
  return {
    offset: offset,
    limit: ENV.APP.DEFAULT_LIMIT
  }
};
