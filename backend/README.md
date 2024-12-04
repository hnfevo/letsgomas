# Setup Project Letsgomas

1. Buat file .env

```
DATABASE_URL="mysql://username:password@host:port/database_name"
```

2. Install Dependencies

```shell

npm install
```

3. Migrasi Database

```shell

npm prisma migrate dev
```

4. Generate Prisma Client

```shell

npx prisma generate
```

5. Build Proyek

```shell

npm run build
```

6. Jalankan Proyek

```shell

npm run start
```
