#!/usr/bin/env node
/**
 * Seed a test admin user into MongoDB for local testing.
 * Stores a PBKDF2-hashed password (not intended for production use).
 */

const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '../.env.local');
  if (!fs.existsSync(envPath)) return;
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');

  for (const line of lines) {
    if (line.trim() && !line.trim().startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      const value = valueParts.join('=').trim();
      if (key.trim()) {
        process.env[key.trim()] = value;
      }
    }
  }
}

loadEnv();

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI not set in environment');
    process.exit(1);
  }

  const { connectToDatabase } = require('../src/lib/mongodb');
  const crypto = require('crypto');

  const username = process.env.BASIC_AUTH_USER || 'admin';
  const password = process.env.BASIC_AUTH_PASS || 'changeme';

  // derive a PBKDF2 hash
  const salt = crypto.randomBytes(16).toString('hex');
  const iterations = 100000;
  const keylen = 64;
  const digest = 'sha512';
  const hash = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');

  try {
    const { db, client } = await connectToDatabase();
    const coll = db.collection('admins');

    const doc = {
      username,
      password: {
        algo: 'pbkdf2',
        salt,
        iterations,
        keylen,
        digest,
        hash,
      },
      createdAt: new Date(),
      note: 'Seeded test admin for local development',
    };

    const res = await coll.updateOne({ username }, { $set: doc }, { upsert: true });
    if (res.upsertedCount) {
      console.log('Inserted test admin:', username);
    } else if (res.modifiedCount) {
      console.log('Updated test admin:', username);
    } else {
      console.log('No changes made for admin:', username);
    }

    const found = await coll.findOne({ username });
    console.log('Admin record:', { username: found.username, createdAt: found.createdAt, note: found.note });

    await client.close();
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
}

main();
