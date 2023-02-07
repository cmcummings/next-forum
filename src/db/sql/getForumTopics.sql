SELECT
  topic_id as id,
  topic_name as name,
  topic_description as description
FROM Forum NATURAL JOIN Topic
WHERE forum_name=$1