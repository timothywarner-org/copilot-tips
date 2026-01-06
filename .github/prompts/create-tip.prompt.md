---
description: Generate a new GitHub Copilot tip entry
tools: ['search']
---

# Create a New Copilot Tip

You are helping create educational tips about GitHub Copilot features and best practices for the copilot-tips API.

## Task
Generate a well-structured tip entry for the tips.json database that teaches developers about a specific GitHub Copilot feature or workflow.

## Structure
Each tip must include:
- `id`: Unique numeric identifier (will be auto-assigned)
- `title`: Clear, action-oriented title (5-8 words max)
- `description`: Concise explanation of the tip (50-150 words)
- `topic`: Category (e.g., "shortcuts", "chat", "debugging", "prompting", "agent-mode")
- `url`: Direct link to official documentation

## Best Practices for Tips
1. **Focus on practical workflows** - Tips should solve real developer problems
2. **Mention keyboard shortcuts** - Include platform-specific shortcuts (Windows/Mac)
3. **Provide context** - Explain when and why to use this feature
4. **Reference official docs** - Always link to github.com or code.visualstudio.com docs
5. **Teaching approach** - Write for learners in an O'Reilly course context

## Example Structure
```json
{
  "title": "Activate Agent Mode for Autonomous Tasks",
  "description": "Switch to Agent mode in Copilot Chat to let AI autonomously research, plan, and implement features. Press the Agent button or use chat commands to enable agentic workflows for larger development tasks.",
  "topic": "agent-mode",
  "url": "https://code.visualstudio.com/docs/copilot/agents/overview"
}
```

Ask me for:
- The specific Copilot feature to document
- The target skill level (beginner/intermediate/advanced)
- Any specific use case context

Then I'll generate a properly formatted tip ready to add to tips.json.
