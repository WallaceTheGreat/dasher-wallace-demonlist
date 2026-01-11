import db from './db.ts';

export const getCurrentRankings = () => {
	const stmt = db.query('SELECT level_id, place, level_name, gd_id FROM ranking_view');
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
		shift_stmt.run();

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

export const updatePlacement = (level_id: number, old_placement: number, new_placement: number) => {
	if (old_placement === new_placement) {
		return;
	}

	const transaction = db.transaction(() => {

		const move_target_stmt = db.query(
			'UPDATE placements_current SET place = -1000000 - level_id WHERE level_id = ?'
		);
		move_target_stmt.run(level_id);

		// CASE 1: moving down
		if (new_placement > old_placement) {
			const tmp_shift_stmt = db.query(
				'UPDATE placements_current SET place = -place WHERE place > ? AND place <= ?'
			);
			tmp_shift_stmt.run(old_placement, new_placement);

			const final_shift_stmt = db.query(
				'UPDATE placements_current SET place = -place - 1 WHERE place < 0'
			);
			final_shift_stmt.run();

		// CASE 2: moving up
		} else {
			const tmp_shift_stmt = db.query(
				'UPDATE placements_current SET place = -place WHERE place >= ? AND place < ?'
			);
			tmp_shift_stmt.run(new_placement, old_placement);

			const final_shift_stmt = db.query(
				'UPDATE placements_current SET place = -place + 1 WHERE place < 0'
			);
			final_shift_stmt.run();
		}

		const final_move_stmt = db.query(
			'UPDATE placements_current SET place = ?, last_updated = CURRENT_TIMESTAMP WHERE level_id = ?'
		);
		final_move_stmt.run(new_placement, level_id);
	});

	transaction();
};

export const getCurrentPlacement = (level_id: number) => {
	const stmt = db.query(
		'SELECT * FROM placements_current WHERE level_id = ?'
	);
	return stmt.get(level_id);
};

export const archiveCurrentRanking = () => {
	const archive_query = `
		INSERT INTO placements_snapshots (level_id, place, snapshot_date)
		SELECT level_id, place, date('now')
		from placements_current;
	`;
	const stmt_archive = db.query(archive_query);
	return stmt_archive.run();
}