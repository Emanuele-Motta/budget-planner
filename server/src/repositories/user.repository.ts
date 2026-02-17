import { prisma } from '../config/prisma.js';

export const userRepository = {
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
  findById: (id: string) => prisma.user.findUnique({ where: { id } }),
  create: (data: { email: string; passwordHash: string; fullName: string }) => prisma.user.create({ data }),
  updateRefreshToken: (id: string, refreshToken: string | null) => prisma.user.update({ where: { id }, data: { refreshToken } })
};
