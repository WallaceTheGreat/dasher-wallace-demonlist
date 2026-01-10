INSERT INTO levels (name, gd_id) VALUES
    ('Black Blizzard', 34057654),
    ('Congregation', 68668045),
    ('Cold Sweat', 63996127),
    ('Kyouki', 86018142 );

INSERT INTO placements (id, level_id, place, placement_date, is_valid) VALUES
    ('8b29c018-5af0-4472-8ed0-b99c86ab6539', 1, 4, CURRENT_TIMESTAMP, 1),
    ('4e58c13c-9f9e-4a8c-ad4c-ef40f6c69cd0', 2, 3, CURRENT_TIMESTAMP, 1),
    ('8317be9a-910c-412f-836e-e436bd482981', 3, 2, CURRENT_TIMESTAMP, 1),
    ('9af3fdf4-f3b9-4c03-9773-8147d0645ca2', 4, 1, CURRENT_TIMESTAMP, 1);

INSERT INTO progresses (level_id, percent, percent_date) VALUES
    (1, 100, '2021-03-23'),
    (2, 100, '2023-01-05'),
    (3, 100, '2023-12-04'),
    (4, 37, '2023-12-04');
