import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultCategories = [
  { name: 'Spesa', icon: 'shopping_cart', color: '#EF5350' },
  { name: 'Trasporti', icon: 'directions_car', color: '#42A5F5' },
  { name: 'Casa', icon: 'home', color: '#AB47BC' },
  { name: 'Stipendio', icon: 'payments', color: '#66BB6A' },
  { name: 'Salute', icon: 'health_and_safety', color: '#EC407A' }
];

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'demo@budgetplanner.it' },
    update: {},
    create: {
      email: 'demo@budgetplanner.it',
      passwordHash: '$2b$10$SNweXH98dW.CWG3f7K6SNuoWRkh57W3PumwN9jPAiV3sPJ0WX7Dsy',
      fullName: 'Utente Demo'
    }
  });

  for (const category of defaultCategories) {
    await prisma.category.upsert({
      where: { id: `${user.id}-${category.name}` },
      update: {},
      create: {
        id: `${user.id}-${category.name}`,
        userId: user.id,
        name: category.name,
        icon: category.icon,
        color: category.color,
        isDefault: true
      }
    });
  }

  console.log('Seed completato');
}

main().finally(() => prisma.$disconnect());
