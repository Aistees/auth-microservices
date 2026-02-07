// src/infrastructure/persistence/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Load the Prisma client from generated folder
const { PrismaClient } = require('../../../generated/prisma/client');

@Injectable()
export class PrismaService 
  extends PrismaClient 
  implements OnModuleInit, OnModuleDestroy 
{
  // Optional: Configure logs or connection URL here if needed
  constructor() {
    // 👇 Prisma 7 Setup: Create the connection pool and adapter
    const connectionString = `${process.env.DATABASE_URL}`;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    // Pass the adapter to the parent constructor
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}