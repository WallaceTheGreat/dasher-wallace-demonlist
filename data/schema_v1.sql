CREATE TABLE levels (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name VARCHAR NOT NULL,
                        gd_id INTEGER
);

CREATE TABLE placements (
                            id TEXT PRIMARY KEY, -- uuid
                            level_id INTEGER NOT NULL,
                            place INTEGER NOT NULL,
                            placement_date DATETIME NOT NULL,
                            is_valid BOOLEAN,
                            FOREIGN KEY (level_id) REFERENCES levels(id)
);

CREATE TABLE scores (
                        id TEXT PRIMARY KEY, -- uuid
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

CREATE INDEX idx_placements_level_id ON placements(level_id);
CREATE INDEX idx_scores_level_id ON scores(level_id);
CREATE INDEX idx_progresses_level_id ON progresses(level_id);

-- VIEWS

-- see the current ranking
CREATE VIEW ranking_view AS
SELECT
    lvl.name AS level_name,
    lvl.gd_id,
    p.place
FROM
    placements p
        JOIN levels AS lvl ON p.level_id = lvl.id
WHERE p.is_valid = 1
ORDER BY p.place
;
