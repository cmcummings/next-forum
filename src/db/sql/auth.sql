SELECT user_id as id, user_name as name, email
FROM users 
WHERE user_name=$1 AND (SELECT password=crypt($2,password) FROM users WHERE user_name=$1);