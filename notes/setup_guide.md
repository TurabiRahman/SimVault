Complete Setup Guide (From Scratch)

This guide summarizes everything you've done so far, in the correct order, so a beginner can follow it from an empty folder.

Step 1 — Create a GitHub Repository
Log in to GitHub.
Click New Repository.
Name it:
SimVault
Do not initialize it with a README.
Click Create Repository.
Step 2 — Create the Project Folder

Create a folder named:

SimVault

Example:

C:\Users\USERAS\Downloads\SimVault

Open this folder in VS Code.

Step 3 — Initialize Git

Open the terminal.

Run:

git init

Check the repository status:

git status

Rename the default branch:

git branch -M main
Step 4 — Create README.md

Create:

README.md

Example content:

# SimVault

A personal repository for simulations, coding experiments, notes, and practice projects.
Step 5 — First Git Commit

Stage files:

git add .

Commit:

git commit -m "Initial commit"
Step 6 — Connect GitHub Repository

Add the remote:

git remote add origin https://github.com/TurabiRahman/SimVault.git

Verify:

git remote -v

Push:

git push -u origin main
Step 7 — Create Project Structure

Create the following folders:

SimVault/
│
├── client/
│
├── database/
│
├── notes/
│
├── server/
│
├── .gitignore
│
└── README.md
Step 8 — Initialize the Backend

Move into the server folder:

cd server

Initialize Node.js:

npm init -y

This creates:

package.json
Step 9 — Install Required Packages

Install runtime dependencies:

npm install express pg dotenv cors multer csv-parser

Install development dependency:

npm install --save-dev nodemon
Step 10 — Create Backend Folder Structure

Inside server, create:

server/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── uploads/
│
├── .env
├── .env.example
├── package.json
├── package-lock.json
Step 11 — Create .gitignore

Create:

server/.gitignore

Add:

# Node dependencies
node_modules/

# Uploaded files
uploads/

# Log files
*.log

# Environment variables
.env

# Secret files
*.key
*.pem
*.secret

# Operating System files
.DS_Store
Thumbs.db
Why these entries?
node_modules/ — Can be recreated with npm install.
uploads/ — Uploaded files shouldn't usually be committed.
*.log — Log files are temporary.
.env — Prevents leaking passwords and secrets.
*.key, *.pem, *.secret — Protects private keys and certificates.
.DS_Store — Hidden macOS file.
Thumbs.db — Hidden Windows thumbnail cache file.
Step 12 — Configure Environment Variables

Create:

server/.env

Example:

PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=simvault
DB_USER=postgres
DB_PASSWORD=your_password

Create:

server/.env.example

Example:

PORT=

DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

This file documents the required variables without exposing real values.

Step 13 — Create app.js

Create:

server/src/app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

module.exports = app;
Step 14 — Create server.js

Create:

server/src/server.js
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
Step 15 — Update package.json

Modify the scripts section:

"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
Step 16 — Run the Server

From inside the server folder:

npm run dev

Expected output:

[nodemon] starting `node src/server.js`

Server is running on port 3000

[nodemon] clean exit - waiting for changes before restart

This confirms that:

Node.js is installed correctly.
Express is configured.
Nodemon is working.
Environment variables are loading.
The backend project structure is valid.
Current Project Structure
SimVault/
│
├── client/
│
├── database/
│
├── notes/
│
├── server/
│   │
│   ├── node_modules/
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── uploads/
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md