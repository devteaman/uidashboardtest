-- SECURITY FIX: Remove the insecure UPDATE policy
-- Previously, the 'Public Update Access' policy allowed anyone to update any row.
-- We have moved bookmark persistence to LocalStorage, so DB updates are no longer needed.

DROP POLICY IF EXISTS "Public Update Access" ON startups;

-- Optional: If you want to be explicit, ensure no updates are allowed (default behavior after drop)
-- No further action needed if only SELECT is permitted.

-- Optional: Clean up the IS_BOOKMARKED column since it's now ignored (or leave it as legacy)
-- ALTER TABLE startups DROP COLUMN is_bookmarked;
