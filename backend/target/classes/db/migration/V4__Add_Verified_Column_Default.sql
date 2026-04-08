-- V4: Add verified column with default value to users table
-- Fixes: null value in column "verified" violates not-null constraint

-- Add column if it doesn't exist, or set default if it does
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'users' AND column_name = 'verified'
    ) THEN
        ALTER TABLE users ADD COLUMN verified BOOLEAN NOT NULL DEFAULT FALSE;
    ELSE
        ALTER TABLE users ALTER COLUMN verified SET DEFAULT FALSE;
        UPDATE users SET verified = FALSE WHERE verified IS NULL;
        ALTER TABLE users ALTER COLUMN verified SET NOT NULL;
    END IF;
END $$;
