SELECT 
  forum_id as id,
  forum_name as name,
  forum_description as description,
  date_created
FROM forum
WHERE forum_name=$1