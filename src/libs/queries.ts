import db from './db.ts';

export const getCurrentRankings = () => {
	const stmt = db.query('SELECT * FROM ranking_view');
	return stmt.all();
}
