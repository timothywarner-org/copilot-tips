# Copilot Tips API

## Purpose

- This is a simple node/express rest api for use in my github copilot class for o'reilly.
- it services github copilot tips from a local json file in /data/tips.json

## Features

- let's do simple testing with mocha and chai
- let's do a great, simple debug config and use Thunder Client for testing api endpoints
- optimized for use in VS Code with github copilot
- we can focus on the GET route, particularly to fetch a random tip or specific one by id or topic (want to test debugging this logic with copilot)

## Notes

- Search the internet for the latest github copilot tips to add to the /data/tips.json file
- Make sure to add at least 20 tips to the tips.json file
- Each tip should have an id, title, description, and url (github copilot docs /vscode github copilot docs are the best source)
- keep in mind we'll likely add an MCP server for this api later on
- this is a teaching/learning repo - all best practices, fully documented clean code, etc. are important
- use ES6+ syntax throughout (no commonjs nonsense)
- use nodemon for development - add a script to package.json for starting in dev mode with nodemon
- use dotenv for configuration management - create a .env file for any config variables (e.g., PORT)
- ensure proper error handling and logging throughout the application, including emojis in log messages for fun
