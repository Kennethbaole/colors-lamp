# COLORS Web Application

A simple color management application built with the LAMP stack that allows users to register, login, and manage their personal color collections.

## Technologies Used

- **Linux** - Ubuntu 24.04 LTS
- **Apache** - Web server
- **MySQL** - Database management
- **PHP** - Backend API logic
- **HTML/CSS/JavaScript** - Frontend interface
- **MD5.js** - Password hashing

## Features

- User authentication (login/register)
- Add colors to personal collection
- Search colors by name
- Persistent storage with MySQL

## Setup Instructions

### Prerequisites
- LAMP stack installed (Linux, Apache, MySQL, PHP)
- MySQL database access

### Database Setup

1. Create the database:
```sql
CREATE DATABASE COP4331;
USE COP4331;
```

2. Create tables:
```sql
-- Users table
CREATE TABLE Users (
  ID INT NOT NULL AUTO_INCREMENT,
  FirstName VARCHAR(50) NOT NULL DEFAULT '',
  LastName VARCHAR(50) NOT NULL DEFAULT '',
  Login VARCHAR(50) NOT NULL DEFAULT '',
  Password VARCHAR(50) NOT NULL DEFAULT '',
  PRIMARY KEY (ID)
) ENGINE = InnoDB;

-- Colors table
CREATE TABLE Colors (
  ID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(50) NOT NULL DEFAULT '',
  UserID INT NOT NULL DEFAULT '0',
  PRIMARY KEY (ID)
) ENGINE = InnoDB;
```

3. Create database user:
```sql
CREATE USER 'DB_USER' IDENTIFIED BY 'DB_PASSWORD';
GRANT ALL PRIVILEGES ON COP4331.* TO 'DB_USER'@'%';
FLUSH PRIVILEGES;
```

### Application Setup

1. Clone this repository
2. Update database credentials in all `api/*.php` files:
   - Replace `DB_USER`, `DB_PASSWORD`, `DB_NAME` with your actual MySQL credentials
3. Copy files to web server:
   - API files → `/var/www/html/LAMPAPI/`
   - Public files → `/var/www/html/`

## How to Run

1. Navigate to `http://your-domain-or-ip/` in a web browser
2. Register a new account or login with existing credentials
3. Add colors to your collection
4. Search for colors by name

## API Endpoints

All endpoints accept POST requests with JSON payloads:

- `POST /LAMPAPI/Login.php` - User authentication
  - Parameters: `login`, `password`
- `POST /LAMPAPI/AddColor.php` - Add a color to user's collection
  - Parameters: `userId`, `color`
- `POST /LAMPAPI/SearchColors.php` - Search user's colors
  - Parameters: `userId`, `search`

## Assumptions & Limitations

- Passwords are hashed using MD5 (not recommended for production use)
- No password recovery mechanism
- Single-user color ownership (no sharing between users)
- Basic input validation only
- Requires manual database configuration

## AI Usage

Claude AI was used to assist with:
- Debugging SSH authentication issues during initial server setup
- Providing guidance on LAMP stack configuration
- Structuring this repository and documentation

## License

This project is licensed under the MIT License - see LICENSE.md for details.
