import db from './db.ts';

export const getCurrentRankings = () => {
	const stmt = db.query('SELECT * FROM ranking_view');
	return stmt.all();
}

export const getAllLevels = () => {
	const stmt = db.query('SELECT * FROM levels');
	return stmt.all();
}

export const getAllUnplacedLevels = () => {
	const unplaced_query = `
		SELECT l.* 
		FROM levels l
		LEFT JOIN placements_current pc ON l.id = pc.level_id
		WHERE pc.level_id IS NULL
		ORDER BY l.name
	`;

	const stmt = db.query(unplaced_query);
	return stmt.all();
}

export const addLevel = (name: string, gd_id: number | null) => {
	const stmt = db.query('INSERT INTO levels (name, gd_id) VALUES (?, ?)');
	return stmt.run(name, gd_id);
}

export const addPlacement = (level_id: number, placement: number) => {
	const transaction = db.transaction(() => {

		const tmp_shift_stmt = db.query(
			'UPDATE placements_current SET place = -place WHERE place >= ?'
		);
		tmp_shift_stmt.run(placement);

		const shift_stmt = db.query(
			'UPDATE placements_current SET place = -place + 1 WHERE place < 0'
		);
		shift_stmt.run(placement);

		console.log("shifted placements");

		const insert_stmt = db.query(`
			INSERT INTO placements_current (level_id, place, last_updated)
			VALUES (?, ?, CURRENT_TIMESTAMP)
		`);
		insert_stmt.run(level_id, placement);

		console.log("inserted new placement");
	});

	transaction();
}

export const archiveCurrentRanking = () => {
	const archive_query = `
		INSERT INTO placements_snapshots (level_id, place, snapshot_date)
		SELECT level_id, place, date('now')
		from placements_current;
	`;
	const stmt_archive = db.query(archive_query);
	return stmt_archive.run();
}