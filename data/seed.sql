INSERT INTO levels (name, gd_id) VALUES
    ('Black Blizzard', 34057654),
    ('Congregation', 68668045),
    ('Cold Sweat', 63996127),
    ('Kyouki', 86018142 );

INSERT INTO placements_current (level_id, place, last_updated) VALUES
    (1, 4, CURRENT_TIMESTAMP),
    (2, 3, CURRENT_TIMESTAMP),
    (3, 2, CURRENT_TIMESTAMP),
    (4, 1, CURRENT_TIMESTAMP);

INSERT INTO progresses (level_id, percent, percent_date) VALUES
    (1, 100, '2021-03-23'),
    (2, 100, '2023-01-05'),
    (3, 100, '2023-12-04'),
    (4, 37, '2023-12-04');
