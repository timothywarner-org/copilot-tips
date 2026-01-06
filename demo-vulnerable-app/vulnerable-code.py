"""
============================================================================
WARNING: INTENTIONALLY VULNERABLE CODE - FOR EDUCATIONAL PURPOSES ONLY
============================================================================

This file contains deliberately insecure code examples to demonstrate
common security vulnerabilities that GitHub Code Scanning (CodeQL) can detect.

DO NOT USE THIS CODE IN PRODUCTION!
DO NOT DEPLOY THIS CODE TO ANY PUBLIC-FACING SERVER!

This is for learning about security vulnerabilities and how to identify them.
============================================================================
"""

import os
import pickle
import sqlite3
import subprocess
import hashlib
from flask import Flask, request, render_template_string, redirect

app = Flask(__name__)

# ============================================================================
# VULNERABILITY #1: Hardcoded Credentials/Secrets
# ============================================================================
# Credentials and secrets should NEVER be hardcoded in source code.
# They should be stored in environment variables or secure vaults.

# VULNERABILITY: Hardcoded database credentials
DATABASE_HOST = "localhost"
DATABASE_USER = "admin"
DATABASE_PASSWORD = "SuperSecretP@ssw0rd123!"  # VULNERABILITY: Hardcoded password
DATABASE_NAME = "production_db"

# VULNERABILITY: Hardcoded API keys and secrets
API_KEY = "sk-1234567890abcdef1234567890abcdef"  # VULNERABILITY: Hardcoded API key
AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE"  # VULNERABILITY: Hardcoded AWS key
AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"  # VULNERABILITY: Hardcoded AWS secret
JWT_SECRET = "my-super-secret-jwt-key-do-not-share"  # VULNERABILITY: Hardcoded JWT secret
ENCRYPTION_KEY = "aes-256-encryption-key-1234567890"  # VULNERABILITY: Hardcoded encryption key

# VULNERABILITY: Hardcoded database connection string
CONNECTION_STRING = "postgresql://admin:password123@db.example.com:5432/myapp"


def get_database_connection():
    """Connect to database using hardcoded credentials."""
    # VULNERABILITY: Using hardcoded credentials
    return sqlite3.connect(f"mysql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}/{DATABASE_NAME}")


# ============================================================================
# VULNERABILITY #2: SQL Injection
# ============================================================================
# User input is directly inserted into SQL queries using string formatting.
# This allows attackers to manipulate queries and access/modify data.

@app.route('/user/<user_id>')
def get_user(user_id):
    """Get user by ID - VULNERABLE to SQL injection."""
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    # VULNERABILITY: SQL Injection - String formatting in query
    query = "SELECT * FROM users WHERE id = '%s'" % user_id
    cursor.execute(query)

    result = cursor.fetchone()
    conn.close()
    return str(result)


@app.route('/login', methods=['POST'])
def login():
    """Login endpoint - VULNERABLE to SQL injection."""
    username = request.form.get('username')
    password = request.form.get('password')

    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    # VULNERABILITY: SQL Injection - f-string formatting in query
    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    cursor.execute(query)

    user = cursor.fetchone()
    conn.close()

    if user:
        return "Login successful!"
    return "Invalid credentials", 401


@app.route('/search')
def search_users():
    """Search users - VULNERABLE to SQL injection."""
    search_term = request.args.get('q', '')

    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    # VULNERABILITY: SQL Injection - String concatenation in query
    query = "SELECT * FROM users WHERE name LIKE '%" + search_term + "%'"
    cursor.execute(query)

    results = cursor.fetchall()
    conn.close()
    return str(results)


@app.route('/delete/<table_name>')
def delete_records(table_name):
    """Delete records - VULNERABLE to SQL injection in table name."""
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    # VULNERABILITY: SQL Injection - User input as table name
    query = "DELETE FROM " + table_name + " WHERE expired = 1"
    cursor.execute(query)

    conn.commit()
    conn.close()
    return "Records deleted"


# ============================================================================
# VULNERABILITY #3: Unsafe Pickle Deserialization
# ============================================================================
# pickle.loads() can execute arbitrary code when deserializing malicious data.
# Never unpickle data from untrusted sources.

@app.route('/load-session', methods=['POST'])
def load_session():
    """Load session data - VULNERABLE to unsafe deserialization."""
    session_data = request.get_data()

    # VULNERABILITY: Unsafe pickle deserialization
    # Attacker can craft malicious pickle data to execute arbitrary code
    user_session = pickle.loads(session_data)

    return f"Welcome back, {user_session.get('username', 'Guest')}!"


@app.route('/import-data', methods=['POST'])
def import_data():
    """Import data from file - VULNERABLE to unsafe deserialization."""
    uploaded_file = request.files.get('file')

    if uploaded_file:
        # VULNERABILITY: Unsafe pickle load from uploaded file
        data = pickle.load(uploaded_file)
        return f"Imported {len(data)} records"

    return "No file uploaded", 400


def restore_backup(backup_file):
    """Restore from backup - VULNERABLE to unsafe deserialization."""
    with open(backup_file, 'rb') as f:
        # VULNERABILITY: Unsafe pickle deserialization from file
        backup_data = pickle.load(f)
    return backup_data


# ============================================================================
# VULNERABILITY #4: eval() with User Input
# ============================================================================
# eval() executes arbitrary Python code, making it extremely dangerous
# when used with user-controlled input.

@app.route('/calculate')
def calculate():
    """Calculator endpoint - VULNERABLE to code injection via eval()."""
    expression = request.args.get('expr', '0')

    # VULNERABILITY: eval() with user input - Remote Code Execution
    # Attacker can input: __import__('os').system('rm -rf /')
    result = eval(expression)

    return f"Result: {result}"


@app.route('/filter')
def filter_data():
    """Filter data - VULNERABLE to code injection via eval()."""
    filter_condition = request.args.get('condition', 'True')
    data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    # VULNERABILITY: eval() in filter with user input
    filtered = [x for x in data if eval(filter_condition)]

    return str(filtered)


@app.route('/config', methods=['POST'])
def update_config():
    """Update config - VULNERABLE to code injection via exec()."""
    config_code = request.form.get('config', '')

    # VULNERABILITY: exec() with user input - Remote Code Execution
    exec(config_code)

    return "Configuration updated"


def process_template(template_string, context):
    """Process template - VULNERABLE to code injection."""
    # VULNERABILITY: eval() used to process template variables
    for key, value in context.items():
        template_string = template_string.replace(f"{{{{ {key} }}}}", str(eval(value)))
    return template_string


# ============================================================================
# Additional Vulnerabilities for Comprehensive Detection
# ============================================================================

# VULNERABILITY: Command Injection
@app.route('/ping')
def ping_host():
    """Ping a host - VULNERABLE to command injection."""
    host = request.args.get('host', 'localhost')

    # VULNERABILITY: Command Injection - User input in shell command
    result = os.popen(f"ping -c 4 {host}").read()

    return f"<pre>{result}</pre>"


@app.route('/run')
def run_command():
    """Run system command - VULNERABLE to command injection."""
    cmd = request.args.get('cmd', 'echo hello')

    # VULNERABILITY: Command Injection - subprocess with shell=True
    output = subprocess.check_output(cmd, shell=True)

    return output


# VULNERABILITY: Path Traversal
@app.route('/file/<filename>')
def get_file(filename):
    """Get file contents - VULNERABLE to path traversal."""
    base_path = "/var/www/uploads/"

    # VULNERABILITY: Path Traversal - No sanitization of filename
    # Attacker can use ../../../etc/passwd
    file_path = base_path + filename

    with open(file_path, 'r') as f:
        return f.read()


# VULNERABILITY: Server-Side Template Injection (SSTI)
@app.route('/greet')
def greet():
    """Greet user - VULNERABLE to template injection."""
    name = request.args.get('name', 'Guest')

    # VULNERABILITY: SSTI - User input in template string
    # Attacker can input: {{ config.items() }} or {{ ''.__class__.__mro__[2].__subclasses__() }}
    template = f"<h1>Hello, {name}!</h1>"

    return render_template_string(template)


# VULNERABILITY: Open Redirect
@app.route('/redirect')
def open_redirect():
    """Redirect to URL - VULNERABLE to open redirect."""
    url = request.args.get('url', '/')

    # VULNERABILITY: Open Redirect - No validation of redirect URL
    # Attacker can redirect to malicious sites
    return redirect(url)


# VULNERABILITY: Weak Password Hashing
def hash_password(password):
    """Hash password - VULNERABLE due to weak algorithm."""
    # VULNERABILITY: Using MD5 for password hashing (weak, fast, no salt)
    return hashlib.md5(password.encode()).hexdigest()


def hash_password_sha1(password):
    """Hash password with SHA1 - Still VULNERABLE."""
    # VULNERABILITY: Using SHA1 for password hashing (weak, no salt)
    return hashlib.sha1(password.encode()).hexdigest()


# VULNERABILITY: Information Disclosure
@app.route('/debug')
def debug_info():
    """Debug endpoint - VULNERABLE to information disclosure."""
    # VULNERABILITY: Exposing sensitive environment variables
    debug_data = {
        'env': dict(os.environ),
        'database_password': DATABASE_PASSWORD,
        'api_key': API_KEY,
        'aws_credentials': {
            'access_key': AWS_ACCESS_KEY_ID,
            'secret_key': AWS_SECRET_ACCESS_KEY
        }
    }
    return str(debug_data)


# VULNERABILITY: Insecure Random Number Generation
import random

def generate_password_reset_token():
    """Generate reset token - VULNERABLE due to weak randomness."""
    # VULNERABILITY: Using random module instead of secrets for security tokens
    token = ''.join(random.choice('abcdefghijklmnopqrstuvwxyz0123456789') for _ in range(32))
    return token


def generate_session_id():
    """Generate session ID - VULNERABLE due to predictable values."""
    # VULNERABILITY: Predictable session ID
    import time
    return hashlib.md5(str(time.time()).encode()).hexdigest()


# VULNERABILITY: XML External Entity (XXE) Injection
from xml.etree.ElementTree import parse as xml_parse
import xml.etree.ElementTree as ET

@app.route('/parse-xml', methods=['POST'])
def parse_xml():
    """Parse XML - VULNERABLE to XXE injection."""
    xml_data = request.get_data()

    # VULNERABILITY: XXE - Parsing untrusted XML without disabling external entities
    tree = ET.fromstring(xml_data)

    return ET.tostring(tree).decode()


if __name__ == '__main__':
    # VULNERABILITY: Debug mode enabled in production
    app.run(debug=True, host='0.0.0.0', port=5000)
