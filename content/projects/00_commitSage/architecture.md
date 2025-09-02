# Architecture Overview

CommitSage is built with a modular architecture that separates concerns between AI processing, Git operations, configuration management, and user interface integration.

## System Architecture

### Core Components

The extension follows a service-oriented architecture with clear separation of responsibilities:

- **Extension Host**: Main entry point (`extension.js`) that coordinates all services
- **Command Handlers**: Process user interactions and VS Code commands
- **Service Layer**: Core business logic for AI, Git, and configuration operations
- **Provider Layer**: Abstracted AI provider implementations

### Service Layer Architecture

#### Git Operations
- **GitService**: Handles repository operations, diff analysis, and change detection
- **GitBlameAnalyzer**: Provides context about code changes and authorship

#### AI Processing
- **AIServiceFactory**: Creates and manages AI provider instances
- **PromptService**: Handles message template processing and prompt generation
- **Message Templates**: Configurable templates for different commit formats

#### Configuration Management
- **ConfigService**: Hierarchical configuration loading and validation
- **SettingsValidator**: Ensures configuration integrity and type safety

#### Infrastructure
- **Logger**: Centralized logging with configurable levels
- **TelemetryService**: Usage analytics and error reporting

## AI Provider Integration

CommitSage supports multiple AI providers through a unified interface:

### Supported Providers

| Provider | API Type | Default Model | Local/Remote |
|----------|----------|---------------|-------------|
| **Gemini** | Google AI API | `gemini-1.5-flash` | Remote |
| **OpenAI** | OpenAI Compatible | `gpt-3.5-turbo` | Remote |
| **Codestral** | Mistral API | `codestral-latest` | Remote |
| **Ollama** | Local HTTP API | `llama3.2` | Local |

### Provider Selection Flow

The system uses a factory pattern to instantiate the appropriate AI service based on configuration:

1. **Configuration Loading**: `ConfigService.getProvider()` determines active provider
2. **API Key Validation**: Validates credentials for remote providers
3. **Model Configuration**: Sets up provider-specific model parameters
4. **Service Initialization**: Creates ready-to-use AI service instance

## Configuration System

### Hierarchical Configuration

CommitSage implements a three-tier configuration system with clear precedence:

1. **Project Configuration** (`.commitsage` files) - Highest priority
2. **VS Code Workspace Settings** - Medium priority
3. **VS Code Global Settings** - Lowest priority

### Configuration Categories

| Category | Purpose | Example Settings |
|----------|---------|------------------|
| **Provider** | AI service selection | `commitSage.provider.type` |
| **Commit Behavior** | Message formatting | `commitSage.commit.commitFormat` |
| **AI Models** | Provider-specific options | `commitSage.gemini.model` |
| **Telemetry** | Analytics configuration | `commitSage.telemetry.enabled` |

## User Interface Integration

### VS Code Integration Points

CommitSage integrates seamlessly with VS Code through multiple touchpoints:

- **Command Registration**: Primary command `commitsage.generateCommitMessage`
- **Keyboard Shortcuts**: `Ctrl+G` (Windows/Linux), `Cmd+G` (Mac)
- **SCM Integration**: Button in Source Control view when Git repository detected
- **Command Palette**: Context-aware command availability

### Menu Integration

The extension provides intuitive access through:
- **SCM Title Bar**: Generate button when `scmProvider == git`
- **Command Palette**: Available when workspace contains Git repository

## Build and Distribution

### Modern Build Pipeline

CommitSage uses a TypeScript/Webpack build system optimized for VS Code extensions:

- **Entry Point**: `./dist/extension.js`
- **Build System**: Webpack with TypeScript compilation
- **Package Format**: VSIX for VS Code Marketplace distribution
- **CI/CD**: GitHub Actions for automated testing and publishing

### Development Workflow

1. **TypeScript Development**: Strongly typed codebase with comprehensive interfaces
2. **Webpack Bundling**: Optimized bundle size for fast extension loading
3. **Automated Testing**: Unit and integration tests for core functionality
4. **Marketplace Publishing**: Automated release pipeline with version management

This architecture ensures CommitSage remains maintainable, extensible, and performant while providing a seamless user experience within VS Code.