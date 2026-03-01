
-- Add a 'content' column to reach_files for storing code/text inline
-- (Small files stored as text directly, large/binary files use storage_path)
ALTER TABLE public.reach_files ADD COLUMN IF NOT EXISTS content text;

-- Add language column for Monaco editor language detection
ALTER TABLE public.reach_files ADD COLUMN IF NOT EXISTS language text;
