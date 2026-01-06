/**
 * ============================================================================
 * WARNING: INTENTIONALLY VULNERABLE CODE - FOR EDUCATIONAL PURPOSES ONLY
 * ============================================================================
 *
 * This file contains deliberately insecure code examples to demonstrate
 * common security vulnerabilities that GitHub Code Scanning (CodeQL) can detect.
 *
 * DO NOT USE THIS CODE IN PRODUCTION!
 * DO NOT DEPLOY THIS CODE TO ANY PUBLIC-FACING SERVER!
 *
 * This is for learning about security vulnerabilities and how to identify them.
 * ============================================================================
 */

const express = require('express');
const mysql = require('mysql');
const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection (example)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password123',  // VULNERABILITY: Hardcoded credentials
    database: 'users_db'
});

// ============================================================================
// VULNERABILITY #1: SQL Injection
// ============================================================================
// The user input is directly concatenated into the SQL query without
// sanitization or parameterized queries. An attacker could input:
// ' OR '1'='1' --
// to bypass authentication or extract data.

app.get('/user', (req, res) => {
    const userId = req.query.id;

    // VULNERABILITY: SQL Injection - User input directly in query string
    const query = "SELECT * FROM users WHERE id = '" + userId + "'";

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Database error');
            return;
        }
        res.json(results);
    });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // VULNERABILITY: SQL Injection - Template literal with user input
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Database error');
            return;
        }
        if (results.length > 0) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

// ============================================================================
// VULNERABILITY #2: Command Injection
// ============================================================================
// User input is passed directly to system commands without sanitization.
// An attacker could input: ; rm -rf / or | cat /etc/passwd
// to execute arbitrary system commands.

app.get('/ping', (req, res) => {
    const host = req.query.host;

    // VULNERABILITY: Command Injection - User input in exec()
    exec('ping -c 4 ' + host, (error, stdout, stderr) => {
        if (error) {
            res.status(500).send('Ping failed');
            return;
        }
        res.send(stdout);
    });
});

app.get('/dns-lookup', (req, res) => {
    const domain = req.query.domain;

    // VULNERABILITY: Command Injection - User input in spawn()
    const child = spawn('nslookup', [domain], { shell: true });

    let output = '';
    child.stdout.on('data', (data) => {
        output += data;
    });

    child.on('close', (code) => {
        res.send(output);
    });
});

app.post('/run-command', (req, res) => {
    const userCommand = req.body.command;

    // VULNERABILITY: Command Injection - Direct execution of user command
    exec(userCommand, (error, stdout, stderr) => {
        res.send(stdout || stderr);
    });
});

// ============================================================================
// VULNERABILITY #3: Path Traversal
// ============================================================================
// User input is used to construct file paths without proper validation.
// An attacker could input: ../../../etc/passwd
// to read sensitive files outside the intended directory.

app.get('/file', (req, res) => {
    const filename = req.query.name;

    // VULNERABILITY: Path Traversal - User input directly in file path
    const filePath = './uploads/' + filename;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('File not found');
            return;
        }
        res.send(data);
    });
});

app.get('/download', (req, res) => {
    const requestedFile = req.query.file;

    // VULNERABILITY: Path Traversal - Using path.join doesn't prevent traversal
    const downloadPath = path.join(__dirname, 'documents', requestedFile);

    // No validation that the resolved path is still within documents directory
    res.sendFile(downloadPath);
});

app.get('/image', (req, res) => {
    const imageName = req.query.img;
    const basePath = '/var/www/images/';

    // VULNERABILITY: Path Traversal - Template literal concatenation
    const imagePath = `${basePath}${imageName}`;

    fs.readFile(imagePath, (err, data) => {
        if (err) {
            res.status(404).send('Image not found');
            return;
        }
        res.contentType('image/jpeg');
        res.send(data);
    });
});

// ============================================================================
// VULNERABILITY #4: Cross-Site Scripting (XSS)
// ============================================================================
// User input is inserted directly into HTML response without escaping.
// An attacker could input: <script>alert('XSS')</script>
// to execute malicious JavaScript in victims' browsers.

app.get('/search', (req, res) => {
    const searchTerm = req.query.q;

    // VULNERABILITY: Reflected XSS - User input directly in HTML
    const html = `
        <html>
            <body>
                <h1>Search Results</h1>
                <p>You searched for: ${searchTerm}</p>
                <p>No results found.</p>
            </body>
        </html>
    `;

    res.send(html);
});

app.get('/profile', (req, res) => {
    const username = req.query.user;

    // VULNERABILITY: Reflected XSS - String concatenation in HTML
    res.send('<html><body><h1>Welcome, ' + username + '!</h1></body></html>');
});

app.get('/error', (req, res) => {
    const errorMessage = req.query.message;

    // VULNERABILITY: Reflected XSS - innerHTML equivalent
    const errorPage = `
        <!DOCTYPE html>
        <html>
        <head><title>Error</title></head>
        <body>
            <div id="error">
                <h2>An error occurred:</h2>
                <div>${errorMessage}</div>
            </div>
        </body>
        </html>
    `;

    res.send(errorPage);
});

app.get('/comment', (req, res) => {
    const comment = req.query.text;

    // VULNERABILITY: Stored/Reflected XSS - User input in attribute
    const html = `
        <html>
        <body>
            <div class="comment" data-author="${req.query.author}">
                <p>${comment}</p>
            </div>
        </body>
        </html>
    `;

    res.send(html);
});

// ============================================================================
// Additional Vulnerabilities for Comprehensive Detection
// ============================================================================

// VULNERABILITY: Insecure Deserialization
app.post('/deserialize', (req, res) => {
    const serializedData = req.body.data;

    // VULNERABILITY: eval() with user input - code injection
    const obj = eval('(' + serializedData + ')');
    res.json(obj);
});

// VULNERABILITY: Server-Side Request Forgery (SSRF)
const axios = require('axios');
app.get('/fetch-url', async (req, res) => {
    const url = req.query.url;

    // VULNERABILITY: SSRF - Fetching arbitrary URLs from user input
    try {
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Failed to fetch URL');
    }
});

// VULNERABILITY: Weak Cryptography
const crypto = require('crypto');
app.post('/hash-password', (req, res) => {
    const password = req.body.password;

    // VULNERABILITY: Weak hash algorithm (MD5)
    const hash = crypto.createHash('md5').update(password).digest('hex');
    res.json({ hash: hash });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
