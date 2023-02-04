const { Client, Result } = require('pg')

const client = new Client({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE
});

const AUTH_QUERY = `
SELECT user_id, user_name, email
FROM users 
WHERE user_name=$1 AND (SELECT password=crypt($2,password) FROM users WHERE user_name=$1);
`

interface AuthResult {
  user_id: string;
  user_name: string;
  email: string
}

async function authorizeUser(username: string, password: string): Promise<AuthResult | null> {
  await client.connect()
  return new Promise((resolve, reject) => {
    client.query({
      text: AUTH_QUERY,
      values: [username, password]
    }).then((res: typeof Result) => {
      client.end()
      if (res.rowCount > 0) {
        resolve(res.rows[0])
      } else {
        reject("Failed to authenticate user.")
      }
    }).catch(reject)
  })
}

export { authorizeUser }