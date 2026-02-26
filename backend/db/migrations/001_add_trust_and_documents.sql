-- Migration: Add trust score, document upload, and admin verification fields
-- Run this on existing database to add new columns without data loss

ALTER TABLE users ADD COLUMN IF NOT EXISTS trust_score INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_photo_url TEXT DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS document_url TEXT DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS document_type VARCHAR(20) DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS admin_notes TEXT DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP;
