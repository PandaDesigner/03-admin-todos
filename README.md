# Development

Steps to
steps to run the app in development

- Start the database

1. start the database

```
docker compose up -d
```

2. rename the .env.example file to .env
3. replace the DATABASE_URL with your database URL
4. run the SEED script [cratedb/seed](localhost:3000/api/seed)

# Prisma Commands

```
 npx prisma init
 npx prisma migrate dev
 npx prisma generate
```

# Production

# Staging
