# Blog Application

This document provides step-by-step instructions to set up and run the Blog Application locally on your machine.

---

## Prerequisites

Before setting up the project, ensure you have the following installed on your machine:

- **PHP**: Version 8.2 or higher
- **Composer**: Dependency manager for PHP
- **Node.js**: Version 16 or higher (including npm or yarn)
- **Sqlite**: Database server
- **Laravel**: Installed globally (optional, for artisan commands)

---

## Steps to Set Up Locally

### 1. Clone the Repository

```bash
git clone https://github.com/grgskls/blog-app.git
cd blog-app
```

### 2. Install Dependencies

Run the following commands to install backend and frontend dependencies:

```bash
composer install
npm install
```

### 3. Configure Environment Variables (included)

1. The `.env` file is included in the repository for your convenience.

2. Verify the following fields in the `.env` file:

   ```env
   APP_NAME=Blog
   APP_URL=http://localhost

   DB_CONNECTION=sqlite
   #DB_HOST=127.0.0.1
   #DB_PORT=3306
   #DB_DATABASE=laravel
   #DB_USERNAME=root
   #DB_PASSWORD=
   ```

### 4. Generate Application Key (included)

Run the following command to generate an application key:

```bash
php artisan key:generate
```

### 5. Set Up the Database

1. Create a database in MySQL with the name specified in the `.env` file (e.g., `blog_app`).

2. Run the migrations and seed the database:

   ```bash
   php artisan migrate --seed
   ```

   This will create the necessary tables and populate them with sample data, including the admin and user accounts.

### 6. Compile Frontend Assets

Compile the frontend assets using the following command:

```bash
npm run dev
```

For production, use:

```bash
npm run build
```

### 7. Start the Development Server

Run the following command to start the development server:

```bash
php artisan serve
```

The application will be accessible at `http://127.0.0.1:8000`.

---

## User Credentials

The following users are seeded into the database for testing purposes:

1. **Admin**:

   - Email: `admin@blogger.com`
   - Password: `admin`

2. **Tom**:

   - Email: `tom@blogger.com`
   - Password: `pw`

3. **Jerry**:

   - Email: `jerry@blogger.com`
   - Password: `pw`

---

## Additional Commands

- **Clear Cache**:

  ```bash
  php artisan cache:clear
  php artisan config:clear
  php artisan route:clear
  php artisan view:clear
  ```

- **Re-seed the Database**:

  If you need to reset the database and re-seed the data:

  ```bash
  php artisan migrate:fresh --seed
  ```

---

Gergely Siklósi 2025.02.11.

