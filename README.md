# warechat

## Stack
- React.js (+MaterialUI)
- Next.js (+NextAuth)
- PostgresQL

Written in TypeScript.

## Requirements

Requires a PostgreSQL database and the schema in `/src/db/schema.sql`.

Requires the environment variables (e.g. in a `.env` file):

For PostgreSQL connection:
```
PG_HOST=
PG_PORT=
PG_USER=
PG_PASSWORD=
PG_DATABASE=
```

For NextAuth configuration:
```
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

## Development

Check/run the PostgreSQL service:

```bash
sudo systemctl status postgresql
sudo systemctl start postgresql
```


Run the development server:

```bash
npm run dev
```

Hosted at [http://localhost:3000](http://localhost:3000)
