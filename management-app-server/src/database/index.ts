import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query);
  console.log('Params: ' + e.params);
  console.log('Duration: ' + e.duration + 'ms');
});

export const db = {
  user: prisma.user,
  team: prisma.team,
  project: prisma.project,
  projectTeam: prisma.projectTeam,
  task: prisma.task,
  taskAssignment: prisma.taskAssignment,
  comment: prisma.comment,
  attachment: prisma.attachment,
};

export { prisma };
