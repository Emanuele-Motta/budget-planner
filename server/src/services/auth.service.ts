import { userRepository } from '../repositories/user.repository.js';
import { comparePassword, hashPassword } from '../utils/crypto.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js';

export const authService = {
  async register(payload: { email: string; password: string; fullName: string }) {
    const existing = await userRepository.findByEmail(payload.email);
    if (existing) throw new Error('EMAIL_ALREADY_USED');

    const passwordHash = await hashPassword(payload.password);
    const user = await userRepository.create({ ...payload, passwordHash });
    return user;
  },

  async login(payload: { email: string; password: string }) {
    const user = await userRepository.findByEmail(payload.email);
    if (!user) throw new Error('INVALID_CREDENTIALS');

    const valid = await comparePassword(payload.password, user.passwordHash);
    if (!valid) throw new Error('INVALID_CREDENTIALS');

    const tokens = {
      accessToken: signAccessToken({ userId: user.id, email: user.email }),
      refreshToken: signRefreshToken({ userId: user.id, email: user.email })
    };

    await userRepository.updateRefreshToken(user.id, tokens.refreshToken);
    return { user, tokens };
  },

  async refresh(refreshToken: string) {
    const decoded = verifyRefreshToken(refreshToken) as { userId: string; email: string };
    const user = await userRepository.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) throw new Error('INVALID_REFRESH_TOKEN');

    return {
      accessToken: signAccessToken({ userId: user.id, email: user.email }),
      refreshToken: signRefreshToken({ userId: user.id, email: user.email })
    };
  }
};
