import { PrismaClient } from '@prisma/client';

const USERS = [
  {
    username: 'admin1',
    password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    role: 'ADMIN' as const,
  },
  {
    username: 'rin1',
    password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    role: 'USER' as const,
  },
  {
    username: 'leeloo1',
    password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    role: 'USER' as const,
  },
];

const TOPICS = [
  {
    name: 'vacations rules',
    questions: {
      create: [
        {
          question: 'how many vacations days do u have every year?',
          correctAnswer: '6',
          starsAmount: 1,
          doc: {
            create: {
              url: 'https://img.freepik.com/free-photo/close-up-pen-market-research_1098-3465.jpg',
              name: 'info.jpg',
            },
          },
        },
        {
          question: 'does every year the amount of vacations get restart?',
          correctAnswer: 'true',
          starsAmount: 2,
          doc: {
            create: {
              url: 'https://img.freepik.com/free-photo/close-up-pen-market-research_1098-3465.jpg',
              name: 'info2.jpg',
            },
          },
        },
        {
          question: 'how many sick days you have every year?',
          correctAnswer: '1',
          starsAmount: 1,
          doc: {
            create: {
              url: 'https://img.freepik.com/free-photo/close-up-pen-market-research_1098-3465.jpg',
              name: 'info3.jpg',
            },
          },
        },
      ],
    },
  },
  {
    name: 'Work schedule',
    questions: {
      create: [
        {
          question: 'How many hours in the day we work?',
          correctAnswer: '12',
          starsAmount: 3,
          doc: {
            create: {
              url: 'https://img.freepik.com/free-photo/close-up-pen-market-research_1098-3465.jpg',
              name: 'info4.jpg',
            },
          },
        },
        {
          question: 'How many we work on saturdays?',
          correctAnswer: '8',
          starsAmount: 5,
          doc: {
            create: {
              url: 'https://img.freepik.com/free-photo/close-up-pen-market-research_1098-3465.jpg',
              name: 'info5.jpg',
            },
          },
        },
      ],
    },
  },
];

const REWARDS = [
  {
    name: 'Free day',
    starsCost: 100,
  },
  {
    name: 'T-shirt',
    starsCost: 80,
  },
];

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.usersTopics.deleteMany();
  await prisma.question.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.reward.deleteMany();
  await prisma.usersRewards.deleteMany();

  console.log('Seeding...');

  console.log('Creating users...');
  const createdUsers = await Promise.all(
    USERS.map(async (user) => {
      await prisma.user.create({
        data: {
          ...user,
        },
      });
    })
  );

  console.log('Creating topics and questions...');
  const createdTopics = await Promise.all(
    TOPICS.map(async (topic) => {
      await prisma.topic.create({
        data: {
          ...topic,
        },
      });
    })
  );

  console.log('Creating rewards...');
  await Promise.all(
    REWARDS.map(async (reward) => {
      await prisma.reward.create({
        data: {
          ...reward,
        },
      });
    })
  );

  console.log('Assigning topics to users...');
  // await prisma.usersTopics.create({
  //   data: {
  //     userId: createdUsers[1],
  //   },
  // });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
