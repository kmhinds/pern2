CREATE TABLE to_do (
    user_id SERIAL PRIMARY KEY,
    description VARCHAR (255),
    priority TEXT,
    CONSTRAINT chk_priority CHECK (priority IN ('low', 'mid', 'high'))
);