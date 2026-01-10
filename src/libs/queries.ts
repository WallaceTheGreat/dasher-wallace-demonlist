import db from './db.ts';

export const getCurrentRankings = () => {
	const stmt = db.query('SELECT * FROM ranking_view');
	return stmt.all();
}

export const getAllLevels = () => {
	const stmt = db.query('SELECT * FROM levels');
	return stmt.all();
}

export const addLevel = (name: string, gd_id: number | null) => {
	const stmt = db.query('INSERT INTO levels (name, gd_id) VALUES (?, ?)');
	return stmt.run(name, gd_id);
}