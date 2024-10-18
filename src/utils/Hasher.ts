import bcrypt from 'bcrypt';
import { SALT_ROUND } from '../configs/config';
const salt = Number(SALT_ROUND);

class Hasher {
  hashPassword(password: string): Promise<string> {
    console.log(typeof salt);
    return bcrypt.hash(password, salt);
  }

  comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}

export default new Hasher();
