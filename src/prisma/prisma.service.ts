import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in environment variables');
  }

    const pool = new Pool({ 
        connectionString: process.env.DATABASE_URL 
    });

    const adapter = new PrismaPg(pool);
    
    // Inisialisasi dengan adapter
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ LMS DKV Tommy Poernomo Database Connected with Adapter!');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}