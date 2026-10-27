# OpenJob API

RESTful API untuk platform lowongan kerja (OpenJob) — Express.js, PostgreSQL, JWT.

## Teknologi
- Node.js + Express 5
- PostgreSQL (`pg`) dengan migrasi `node-pg-migrate`
- Validasi data: Joi (middleware)
- Autentikasi: JWT (access token 3 jam + refresh token tersimpan di database)
- Password di-hash dengan bcryptjs

## Struktur Proyek
```
openjob-api/
├── migrations/                  # file migrasi (bertimestamp)
├── src/
│   ├── config/database.js       # koneksi PostgreSQL (dari env PG*)
│   ├── controllers/             # handler request/response
│   ├── middlewares/             # auth, validate (Joi), errorHandler
│   ├── routes/                  # definisi endpoint
│   ├── services/                # query database & logika bisnis
│   ├── utils/                   # errors, tokenManager, id
│   ├── validators/              # skema Joi
│   ├── app.js
│   └── server.js
├── ERD-OpenJob-versi-1.png
├── .env.example
└── package.json
```

## Cara Menjalankan
1. Pastikan Node.js (>= 18) dan PostgreSQL sudah terpasang.
2. Buat database:
   ```sql
   CREATE DATABASE openjob;
   ```
3. Install dependency:
   ```bash
   npm install
   ```
4. Salin env, lalu isi nilainya:
   ```bash
   cp .env.example .env
   ```
   Generate secret key JWT:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   Jalankan dua kali, hasilnya untuk `ACCESS_TOKEN_KEY` dan `REFRESH_TOKEN_KEY`.
5. Jalankan migrasi:
   ```bash
   npm run migrate up
   ```
6. Jalankan server:
   ```bash
   npm run start:dev
   ```
   Server berjalan di `http://HOST:PORT` sesuai `.env`.

## Perintah Migrasi
```bash
npm run migrate up                     # jalankan semua migrasi
npm run migrate down                   # rollback satu migrasi
npm run migrate create nama-migrasi    # buat migrasi baru (timestamp otomatis)
```

## Environment Variable
| Variabel | Keterangan |
|---|---|
| HOST, PORT | alamat HTTP server |
| PGUSER, PGPASSWORD, PGDATABASE, PGHOST, PGPORT | koneksi PostgreSQL |
| ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY | secret JWT |

## Endpoint
**Public:** `POST /users`, `GET /users/:id`, `GET /companies`, `GET /companies/:id`, `GET /categories`, `GET /categories/:id`, `GET /jobs` (`?title=`, `?company-name=`), `GET /jobs/:id`, `GET /jobs/company/:companyId`, `GET /jobs/category/:categoryId`, `POST /authentications`, `PUT /authentications`

**Protected** (`Authorization: Bearer <access_token>`): `GET /profile`, `GET /profile/applications`, `GET /profile/bookmarks`, CRUD `companies` / `categories` / `jobs` (POST, PUT, DELETE), seluruh `/applications`, `POST|GET|DELETE /jobs/:jobId/bookmark`, `GET /bookmarks`, `DELETE /authentications`

## Contoh Body
```jsonc
// POST /users
{ "name": "Budi", "email": "budi@mail.com", "password": "rahasia123" }
// POST /authentications
{ "email": "budi@mail.com", "password": "rahasia123" }
// PUT & DELETE /authentications
{ "refreshToken": "<refresh_token>" }
// POST /jobs
{ "company_id": "company-...", "category_id": "category-...", "title": "Backend Developer",
  "description": "...", "job_type": "full-time", "experience_level": "junior",
  "location_type": "onsite", "location_city": "Balikpapan",
  "salary_min": 5000000, "salary_max": 8000000, "is_salary_visible": true, "status": "open" }
// POST /applications
{ "job_id": "job-...", "cover_letter": "Saya tertarik..." }
// PUT /applications/:id
{ "status": "accepted" }   // pending | accepted | rejected
```

## Pengujian Otomatis (Automated Testing)
Proyek ini telah melalui tahap pengujian integrasi otomatis menyeluruh (*Automated Integration Testing*) menggunakan Postman Collection Runner.

- **Total Pengujian (All Tests):** 296 test scripts
- **Hasil Pengujian (Pass Rate):** 100% (296 Passed, 0 Failed, 0 Errors)
- **Modul Teruji:** Authentications, Users, Companies, Categories, Jobs, Applications, Bookmarks, dan Profile.
