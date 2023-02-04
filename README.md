# Stack
- React.js (+MaterialUI)
- Next.js (+NextAuth)
- PostgresQL

Written in TypeScript.

Requires environment variables for PostgreSQL connection and NextAuth configuration:

```
PG_HOST=
PG_PORT=
PG_USER=
PG_PASSWORD=
PG_DATABASE=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

Check/run the PostgreSQL service:

```bash
sudo systemctl status postgresql
sudo systemctl start postgresql
```

Run the development server:

```bash
npm run dev
```

Hosted at: [http://localhost:3000](http://localhost:3000)
