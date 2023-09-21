import { verify } from 'jsonwebtoken';
import { KEY_VERIFY } from "../constant";

export function getUserName(token: string) {
  const user = verify(token, KEY_VERIFY);

  return user.username;
}
