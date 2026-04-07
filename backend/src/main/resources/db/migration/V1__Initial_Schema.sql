-- V1: Initial Schema for Student Connect

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    avatar_url VARCHAR(255),
    bio TEXT,
    college VARCHAR(255),
    department VARCHAR(255),
    year INT,
    role VARCHAR(50) NOT NULL,
    points INT DEFAULT 0,
    is_enabled BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clubs (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    banner_url VARCHAR(255),
    logo_url VARCHAR(255),
    category VARCHAR(255),
    college VARCHAR(255),
    member_count INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    leader_id BIGINT REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE club_members (
    id BIGSERIAL PRIMARY KEY,
    club_id BIGINT NOT NULL REFERENCES clubs(id),
    user_id BIGINT NOT NULL REFERENCES users(id),
    role VARCHAR(50) NOT NULL,
    joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(club_id, user_id)
);

CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    banner_url VARCHAR(255),
    type VARCHAR(50) NOT NULL,
    mode VARCHAR(50) NOT NULL,
    location VARCHAR(255),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    registration_deadline TIMESTAMP,
    max_participants INT,
    current_participants INT DEFAULT 0,
    club_id BIGINT NOT NULL REFERENCES clubs(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE event_participants (
    event_id BIGINT NOT NULL REFERENCES events(id),
    user_id BIGINT NOT NULL REFERENCES users(id),
    PRIMARY KEY (event_id, user_id)
);

CREATE TABLE mentors (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id),
    bio TEXT,
    availability VARCHAR(255),
    rating FLOAT DEFAULT 0.0,
    total_sessions INT DEFAULT 0,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE mentor_expertise (
    mentor_id BIGINT NOT NULL REFERENCES mentors(id),
    skill VARCHAR(255) NOT NULL
);

CREATE TABLE mentor_slots (
    id BIGSERIAL PRIMARY KEY,
    mentor_id BIGINT NOT NULL REFERENCES mentors(id),
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE
);

CREATE TABLE mentor_bookings (
    id BIGSERIAL PRIMARY KEY,
    mentor_id BIGINT NOT NULL REFERENCES mentors(id),
    student_id BIGINT NOT NULL REFERENCES users(id),
    slot_id BIGINT NOT NULL UNIQUE REFERENCES mentor_slots(id),
    status VARCHAR(50) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE opportunities (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    company VARCHAR(255),
    location VARCHAR(255),
    is_remote BOOLEAN DEFAULT FALSE,
    application_url VARCHAR(255),
    deadline TIMESTAMP,
    posted_by_id BIGINT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE opportunity_tags (
    opportunity_id BIGINT NOT NULL REFERENCES opportunities(id),
    tag VARCHAR(255) NOT NULL
);

CREATE TABLE chat_messages (
    id BIGSERIAL PRIMARY KEY,
    club_id BIGINT NOT NULL REFERENCES clubs(id),
    sender_id BIGINT NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'TEXT',
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE badges (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    icon_url VARCHAR(255),
    category VARCHAR(255) NOT NULL
);

CREATE TABLE user_badges (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    badge_id BIGINT NOT NULL REFERENCES badges(id),
    earned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
