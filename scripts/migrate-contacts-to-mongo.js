#!/usr/bin/env node
// Migration script: import src/data/contacts.json into MongoDB contacts collection

async function main() {
  const fs = require('fs');
  const path = require('path');
  const { connectToDatabase } = require('../src/lib/mongodb');
  const CONTACTS_PATH = path.join(process.cwd(), 'src', 'data', 'contacts.json');

  if (!process.env.MONGODB_URI) {
    console.error('Please set MONGODB_URI in environment to run migration.');
    process.exit(1);
  }

  let raw;
  try {
    raw = fs.readFileSync(CONTACTS_PATH, 'utf8');
  } catch (e) {
    console.error('No contacts.json found at', CONTACTS_PATH);
    process.exit(1);
  }

  let contacts;
  try {
    contacts = JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse contacts.json:', e);
    process.exit(1);
  }

  if (!Array.isArray(contacts) || contacts.length === 0) {
    console.log('No contacts to migrate.');
    process.exit(0);
  }

  const { db, client } = await connectToDatabase();
  const coll = db.collection('contacts');

  // Insert many but avoid duplicates: we'll check by email+createdAt
  const toInsert = contacts.map((c) => ({
    name: c.name,
    email: c.email,
    phone: c.phone || '',
    subject: c.subject,
    message: c.message,
    createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
  }));

  const res = await coll.insertMany(toInsert);
  console.log(`Inserted ${res.insertedCount} contacts into MongoDB.`);
  await client.close();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
