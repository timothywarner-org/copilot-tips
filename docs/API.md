# API Documentation

## Base URL

```
http://localhost:3000/api
```

## Endpoints

### Tips

#### Get All Tips

```
GET /tips
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Accept Suggestions with Tab",
    "description": "Press Tab to accept a full inline suggestion from GitHub Copilot.",
    "topic": "shortcuts",
    "url": "https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot"
  }
]
```

#### Get Random Tip

```
GET /tips/random
```

Returns a single random tip from the collection.

**Response:**
```json
{
  "id": 7,
  "title": "Write Descriptive Comments First",
  "description": "Write a clear comment describing what you want to accomplish before writing code.",
  "topic": "prompts",
  "url": "https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot"
}
```

#### Get Tip by ID

```
GET /tips/:id
```

**Response:**
```json
{
  "id": 1,
  "title": "Accept Suggestions with Tab",
  "description": "Press Tab to accept a full inline suggestion from GitHub Copilot.",
  "topic": "shortcuts",
  "url": "https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot"
}
```

**Error Response (404):**
```json
{
  "error": "Tip not found"
}
```

#### Get Tips by Topic

```
GET /tips/topic/:topic
```

Returns all tips that match the specified topic.

**Available Topics:**
- `shortcuts` - Keyboard shortcuts for Copilot suggestions
- `chat` - Copilot Chat features and slash commands
- `completions` - Code completion tips and tricks
- `prompts` - Prompt engineering best practices
- `agents` - Copilot agents and CLI tools

**Response:**
```json
[
  {
    "id": 1,
    "title": "Accept Suggestions with Tab",
    "description": "Press Tab to accept a full inline suggestion from GitHub Copilot.",
    "topic": "shortcuts",
    "url": "https://docs.github.com/en/copilot/using-github-copilot/getting-code-suggestions-in-your-ide-with-github-copilot"
  }
]
```

#### Create Tip

```
POST /tips
```

**Request Body:**
```json
{
  "title": "New Copilot Tip",
  "description": "Detailed description of the tip",
  "topic": "prompts",
  "url": "https://docs.github.com/en/copilot"
}
```

**Response:** `201 Created`
```json
{
  "id": "36",
  "title": "New Copilot Tip",
  "description": "Detailed description of the tip",
  "topic": "prompts",
  "url": "https://docs.github.com/en/copilot",
  "createdAt": "2026-01-06T00:00:00.000Z",
  "updatedAt": "2026-01-06T00:00:00.000Z"
}
```

#### Update Tip

```
PUT /tips/:id
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "topic": "chat"
}
```

**Response:** `200 OK`
```json
{
  "id": "1",
  "title": "Updated Title",
  "description": "Updated description",
  "topic": "chat",
  "url": "https://docs.github.com/en/copilot",
  "updatedAt": "2026-01-06T00:00:00.000Z"
}
```

#### Delete Tip

```
DELETE /tips/:id
```

**Response:** `204 No Content`

## Health Check

```
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "message": "Error description",
    "status": 404
  }
}
```

### Common Error Codes

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid input data |
| 404 | Not Found - Resource does not exist |
| 500 | Internal Server Error |
