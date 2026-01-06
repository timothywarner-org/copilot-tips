# Demo Vulnerable App

> **WARNING: This directory contains intentionally vulnerable dependencies for demonstration purposes only.**

## Purpose

This folder exists to demonstrate GitHub's security features:

1. **Dependabot Security Alerts** - GitHub will detect the vulnerable dependencies in `package.json` and create security alerts
2. **Copilot Autofix** - GitHub Copilot can automatically suggest fixes for the security vulnerabilities
3. **Dependency Graph** - View how dependencies relate to each other in the repository's Insights

## Vulnerable Dependencies Included

| Package | Version | Vulnerability |
|---------|---------|---------------|
| lodash | 4.17.20 | Prototype Pollution (CVE-2021-23337) |
| axios | 0.21.0 | Server-Side Request Forgery (CVE-2021-3749) |
| minimist | 1.2.5 | Prototype Pollution (CVE-2021-44906) |
| node-fetch | 2.6.6 | Exposure of Sensitive Information (CVE-2022-0235) |
| serialize-javascript | 2.1.0 | Remote Code Execution (CVE-2020-7660) |
| y18n | 4.0.0 | Prototype Pollution (CVE-2020-7774) |
| glob-parent | 5.1.1 | Regular Expression Denial of Service (CVE-2020-28469) |
| path-parse | 1.0.6 | Regular Expression Denial of Service (CVE-2021-23343) |
| trim-newlines | 3.0.0 | Regular Expression Denial of Service (CVE-2021-33623) |
| ansi-regex | 5.0.0 | Regular Expression Denial of Service (CVE-2021-3807) |
| ini | 1.3.5 | Prototype Pollution (CVE-2020-7788) |
| hosted-git-info | 2.8.8 | Regular Expression Denial of Service (CVE-2021-23362) |

## How to Use for Demo

1. **Push this to GitHub** - Dependabot will automatically scan the `package.json`
2. **Check Security Tab** - Navigate to Security > Dependabot alerts to see the detected vulnerabilities
3. **Use Copilot Autofix** - Click on any alert to see Copilot's suggested fix
4. **Create a PR** - Copilot can automatically create a pull request with the fix

## Important Notes

- **DO NOT run `npm install`** in this directory
- **DO NOT use this code in production**
- This is purely for educational and demonstration purposes
- The `node_modules` folder should never be created here

## Clean Up

When you're done with the demonstration, you can safely delete this entire `demo-vulnerable-app` directory.
