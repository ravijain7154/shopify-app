import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',

  datasource: {
    db: {
      url: process.env.DATABASE_URL!,  // Prisma 7 requires this
    },
  },
});
