# Installation and Setup Guide

This guide covers the complete installation and initial configuration process for CommitSage, an AI-powered VS Code extension for automatic Git commit message generation.

## Prerequisites

Before installing CommitSage, ensure your development environment meets these requirements:

| Requirement | Minimum Version | Purpose |
|-------------|----------------|----------|
| **VS Code** | 1.93.0+ | Extension host environment |
| **Git** | Any recent version | Source control integration |
| **Internet Connection** | Required | API access (except Ollama) |

## Installation Methods

### Via VS Code Marketplace

1. **Open VS Code**
2. **Navigate to Extensions view** (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. **Search for "Commit Sage"** or "VizzleTF.commitsage"
4. **Click "Install"** on the extension by VizzleTF
5. **Extension activates automatically** when Git repository is detected

### Via Command Palette

1. **Open Command Palette** (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. **Type** `Extensions: Install Extensions`
3. **Search for "Commit Sage"**
4. **Install the extension**

## Initial Configuration

After installation, CommitSage requires AI provider configuration before generating commit messages.

### AI Provider Setup

CommitSage supports four AI providers. Choose one based on your preferences:

#### Gemini (Recommended)

**Default provider with excellent performance and cost-effectiveness.**

1. **Get API Key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Open Command Palette** (`Ctrl+Shift+P`)
3. **Run**: "Commit Sage: Set Gemini API Key"
4. **Enter API key** when prompted
5. **Key is validated and stored securely**

**Configuration:**
```json
{
  "commitSage.provider.type": "gemini",
  "commitSage.gemini.model": "gemini-1.5-flash"
}
```

#### OpenAI

**Popular choice with proven reliability.**

1. **Get API Key**: Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Open Command Palette**
3. **Run**: "Commit Sage: Set OpenAI API Key"
4. **Enter API key**

**Configuration:**
```json
{
  "commitSage.provider.type": "openai",
  "commitSage.openai.model": "gpt-3.5-turbo"
}
```

#### Codestral

**Specialized coding model by Mistral AI.**

1. **Get API Key**: Visit [Mistral AI Platform](https://console.mistral.ai/)
2. **Open Command Palette**
3. **Run**: "Commit Sage: Set Codestral API Key"
4. **Enter API key**

**Configuration:**
```json
{
  "commitSage.provider.type": "codestral",
  "commitSage.codestral.model": "codestral-latest"
}
```

#### Ollama (Local)

**Privacy-focused local AI processing.**

1. **Install Ollama**: Visit [Ollama.ai](https://ollama.ai/)
2. **Pull a model**: `ollama pull llama3.2`
3. **Configure base URL** (default: `http://localhost:11434`)

**Configuration:**
```json
{
  "commitSage.provider.type": "ollama",
  "commitSage.ollama.model": "llama3.2",
  "commitSage.ollama.baseUrl": "http://localhost:11434"
}
```

## Essential Settings

Configure these key settings for optimal experience:

### Basic Configuration

| Setting | Default | Options | Purpose |
|---------|---------|---------|----------|
| `commitSage.provider.type` | `"gemini"` | `gemini`, `openai`, `codestral`, `ollama` | AI provider selection |
| `commitSage.commit.commitLanguage` | `"english"` | `english`, `russian`, `chinese`, `japanese`, `spanish` | Commit message language |
| `commitSage.commit.commitFormat` | `"conventional"` | `conventional`, `angular`, `karma`, `semantic`, `emoji` | Message format style |
| `commitSage.commit.onlyStagedChanges` | `false` | `true`, `false` | Analyze staged vs all changes |

### Advanced Options

```json
{
  "commitSage.commit.autoCommit": false,
  "commitSage.commit.autoPush": false,
  "commitSage.commit.maxTokens": 1000,
  "commitSage.commit.temperature": 0.7,
  "commitSage.telemetry.enabled": true
}
```

## Configuration Hierarchy

CommitSage uses a hierarchical configuration system:

1. **Project Configuration** (`.commitsage` files) - **Highest Priority**
2. **VS Code Workspace Settings** - **Medium Priority**
3. **VS Code Global Settings** - **Lowest Priority**

### Project-Specific Configuration

Create a `.commitsage` file in your project root for project-specific settings:

```json
{
  "provider": {
    "type": "gemini"
  },
  "commit": {
    "commitFormat": "conventional",
    "commitLanguage": "english",
    "customInstructions": "Focus on business impact and technical details"
  }
}
```

## Verification

### Test Installation

1. **Open a Git repository** in VS Code
2. **Make some changes** to files
3. **Stage changes** (`git add` or VS Code source control)
4. **Press `Ctrl+G`** (`Cmd+G` on Mac) or click CommitSage button
5. **Verify commit message generation**

### Available Commands

After installation, these commands are available:

| Command | Keybinding | Purpose |
|---------|------------|---------|
| `commitsage.generateCommitMessage` | `Ctrl+G` / `Cmd+G` | Generate commit message |
| `commitsage.setApiKey` | None | Configure Gemini API key |
| `commitsage.setOpenAIApiKey` | None | Configure OpenAI API key |
| `commitsage.setCodestralApiKey` | None | Configure Codestral API key |
| `commitsage.createProjectConfig` | None | Create `.commitsage` file |

## Troubleshooting

### Common Issues

**Extension not activating:**
- Ensure you're in a Git repository
- Check VS Code version compatibility (1.93.0+)

**API key errors:**
- Verify API key validity
- Check internet connection
- Ensure sufficient API credits/quota

**No commit message generated:**
- Verify staged changes exist
- Check provider configuration
- Review VS Code output panel for errors

### Getting Help

- **GitHub Issues**: Report bugs and feature requests
- **VS Code Output Panel**: Check "Commit Sage" channel for logs
- **Command Palette**: Use "Developer: Reload Window" to restart extension

## Next Steps

After successful installation:

1. **Experiment with different commit formats**
2. **Try various AI providers** to find your preference
3. **Configure project-specific settings** with `.commitsage` files
4. **Enable automation features** like auto-commit and auto-push
5. **Customize prompts** for specific project requirements

CommitSage is now ready to enhance your Git workflow with AI-powered commit messages!