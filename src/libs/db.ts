import Database from 'bun:sqlite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '../../data/db.sqlite');

export const db = new Database(dbPath);

db.run('PRAGMA foreign_keys = ON');

if (process.env.NODE_ENV === 'development') {
	db.run('PRAGMA journal_mode = WAL');
}

export default db;