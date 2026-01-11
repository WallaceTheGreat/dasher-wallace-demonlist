CREATE TABLE levels (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name VARCHAR NOT NULL,
                        gd_id INTEGER
);

CREATE TABLE placements_current (
                                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                                    level_id INTEGER NOT NULL UNIQUE,
                                    place INTEGER NOT NULL UNIQUE,
                                    last_updated DATETIME NOT NULL,
                                    FOREIGN KEY (level_id) REFERENCES levels(id)
);

CREATE TABLE placements_snapshots (
                                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      level_id INTEGER NOT NULL,
                                      place INTEGER NOT NULL,
                                      snapshot_date DATETIME NOT NULL,
                                      FOREIGN KEY (level_id) REFERENCES levels(id)
);

CREATE TABLE scores (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        level_id INTEGER NOT NULL,
                        score INTEGER NOT NULL,
                        FOREIGN KEY (level_id) REFERENCES levels(id)
);

CREATE TABLE progresses (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            level_id INTEGER NOT NULL,
                            percent INTEGER NOT NULL,
                            percent_date DATETIME NOT NULL,
                            FOREIGN KEY (level_id) REFERENCES levels(id)
);

CREATE TABLE levels_opinions (
                                 id INTEGER PRIMARY KEY AUTOINCREMENT,
                                 level_id INTEGER NOT NULL,
                                 opinion VARCHAR NOT NULL,
                                 FOREIGN KEY (level_id) REFERENCES levels(id)
);

CREATE INDEX idx_placements_current_level_id ON placements_current(level_id);
CREATE INDEX idx_placements_snapshots_level_id ON placements_snapshots(level_id);
CREATE INDEX idx_placements_snapshots_date ON placements_snapshots(snapshot_date);
CREATE INDEX idx_scores_level_id ON scores(level_id);
CREATE INDEX idx_progresses_level_id ON progresses(level_id);
CREATE INDEX idx_levels_opinions_level_id ON levels_opinions(level_id);

CREATE VIEW ranking_view AS
SELECT
    pc.place,
    l.name AS level_name,
    l.gd_id
FROM placements_current pc
         JOIN levels l ON pc.level_id = l.id
ORDER BY pc.place
;
