# Features Overview

CommitSage is a comprehensive AI-powered VS Code extension that revolutionizes Git commit message generation. This page details all features and capabilities that make CommitSage an essential tool for developers.

## Core Features

### 🤖 AI-Powered Generation

**Intelligent commit message creation using advanced AI models**

- **Context Analysis**: Analyzes code changes, file modifications, and Git diff
- **Semantic Understanding**: Understands the purpose and impact of changes
- **Natural Language**: Generates human-readable, meaningful commit messages
- **Consistency**: Maintains consistent style and format across commits

**Supported Analysis:**
- File additions, deletions, and modifications
- Code structure changes
- Import/export modifications
- Configuration updates
- Documentation changes

### 🔄 Multi-Provider Support

**Flexibility to choose your preferred AI provider**

| Provider | Type | Strengths | Use Case |
|----------|------|-----------|----------|
| **Gemini** | Google AI | Fast, cost-effective, excellent code understanding | Default choice, general development |
| **OpenAI** | GPT Models | Proven reliability, comprehensive language support | Enterprise, high-quality output |
| **Codestral** | Mistral AI | Specialized for coding, technical accuracy | Code-heavy projects, technical teams |
| **Ollama** | Local AI | Privacy-focused, no API costs, offline capable | Security-sensitive, offline development |

**Provider Switching:**
- Seamless switching between providers
- Per-project provider configuration
- Fallback mechanisms for reliability

### 📝 Format Support

**Multiple commit message formats to match your workflow**

#### Conventional Commits
```
feat(auth): implement OAuth2 integration

- Add Google OAuth2 flow
- Implement token refresh mechanism
- Update user session management
```

#### Angular Format
```
feat(core): add user authentication service

Implement comprehensive authentication with JWT tokens,
automatic refresh, and role-based access control.

Closes #123
```

#### Semantic Format
```
MAJOR: redesign component architecture

Breaking changes to UI components:
- Migrate to functional components
- Update prop interfaces
- Remove deprecated methods
```

#### Emoji Format
```
✨ feat: add dark mode support

🎨 Implement theme switching
🔧 Add localStorage persistence
📱 Ensure mobile compatibility
```

#### Karma Format
```
add user profile management

implement editing, avatar upload, and preferences
```

### 🌍 Multi-Language Support

**Generate commit messages in your preferred language**

| Language | Example |
|----------|----------|
| **English** | `feat: add user authentication system` |
| **Russian** | `feat: добавить систему аутентификации пользователя` |
| **Chinese** | `feat: 添加用户身份验证系统` |
| **Japanese** | `feat: ユーザー認証システムを追加` |
| **Spanish** | `feat: agregar sistema de autenticación de usuario` |

**Language Features:**
- Native language commit messages
- Cultural context awareness
- Technical terminology translation
- Consistent formatting across languages

## Advanced Features

### ⚡ Workflow Automation

**Streamline your Git workflow with intelligent automation**

#### Auto-Commit
- **Automatic commit creation** after message generation
- **Confirmation prompts** for safety
- **Customizable commit behavior**
- **Integration with existing workflows**

#### Auto-Push
- **Automatic push** after successful commit
- **Branch-aware pushing**
- **Remote repository sync**
- **Configurable push behavior**

#### Smart Staging
- **Staged-only analysis** for precise commits
- **All-changes analysis** for comprehensive commits
- **Intelligent change grouping**
- **Context-aware suggestions**

### 🎛️ Project Configuration

**Flexible configuration system for team and project needs**

#### Hierarchical Settings
1. **Project Configuration** (`.commitsage` files) - Highest priority
2. **Workspace Settings** - Medium priority
3. **Global Settings** - Lowest priority

#### Project-Specific Customization
```json
{
  "provider": {
    "type": "gemini"
  },
  "commit": {
    "commitFormat": "conventional",
    "commitLanguage": "english",
    "customInstructions": "Include ticket numbers and focus on business impact",
    "autoCommit": false
  }
}
```

#### Team Collaboration
- **Shared configuration files**
- **Version-controlled settings**
- **Consistent team standards**
- **Onboarding simplification**

### 🔧 Customization Options

**Tailor CommitSage to your specific needs**

#### Custom Instructions
- **Project-specific prompts**
- **Business context integration**
- **Technical requirement specification**
- **Style guide enforcement**

#### AI Model Configuration
- **Temperature control** for creativity vs consistency
- **Token limits** for message length
- **Model selection** for quality vs speed
- **Provider-specific optimizations**

#### UI Integration
- **Keyboard shortcuts** (`Ctrl+G` / `Cmd+G`)
- **Source Control integration**
- **Command Palette access**
- **Context-aware availability**

## Integration Features

### 🔗 VS Code Integration

**Seamless integration with VS Code ecosystem**

#### Source Control Integration
- **Native SCM view integration**
- **Git repository detection**
- **Branch-aware operations**
- **Merge conflict awareness**

#### Command System
- **Comprehensive command palette**
- **Keyboard shortcut support**
- **Context-sensitive commands**
- **Batch operations**

#### Settings Integration
- **VS Code settings sync**
- **Workspace-specific configuration**
- **Extension settings UI**
- **JSON schema validation**

### 📊 Analytics and Telemetry

**Optional usage analytics for improvement**

#### Usage Metrics
- **Generation frequency**
- **Provider performance**
- **Error tracking**
- **Feature adoption**

#### Privacy Controls
- **Opt-in telemetry**
- **Data anonymization**
- **Local-only options**
- **Transparent reporting**

## Security Features

### 🔐 API Key Management

**Secure credential storage and management**

#### Secure Storage
- **VS Code SecretStorage API**
- **Encrypted credential storage**
- **Per-workspace isolation**
- **Automatic key rotation support**

#### Validation
- **API key verification**
- **Provider connectivity testing**
- **Error handling and recovery**
- **Fallback mechanisms**

### 🛡️ Privacy Protection

**Code privacy and data protection**

#### Local Processing
- **Ollama local AI support**
- **No code transmission** (local providers)
- **Offline capability**
- **Air-gapped environment support**

#### Data Handling
- **Minimal data transmission**
- **No persistent storage** of code
- **Configurable privacy levels**
- **GDPR compliance considerations**

## Performance Features

### ⚡ Speed Optimization

**Fast and efficient commit message generation**

#### Caching
- **Configuration caching**
- **Provider connection pooling**
- **Response optimization**
- **Background processing**

#### Efficiency
- **Minimal resource usage**
- **Asynchronous operations**
- **Progressive loading**
- **Smart batching**

### 📈 Scalability

**Handles projects of any size**

#### Large Repository Support
- **Efficient diff analysis**
- **Selective file processing**
- **Memory optimization**
- **Streaming operations**

#### Team Scaling
- **Multi-user configuration**
- **Shared settings management**
- **Consistent team experience**
- **Enterprise deployment ready**

## Developer Experience

### 🎯 User-Friendly Interface

**Intuitive and accessible design**

#### Accessibility
- **Keyboard navigation**
- **Screen reader support**
- **High contrast compatibility**
- **Customizable UI elements**

#### Feedback
- **Progress indicators**
- **Error messages**
- **Success notifications**
- **Contextual help**

### 🔄 Continuous Improvement

**Regular updates and enhancements**

#### Feature Updates
- **New AI provider support**
- **Enhanced format options**
- **Performance improvements**
- **Bug fixes and stability**

#### Community Driven
- **Open source development**
- **Community feedback integration**
- **Feature request system**
- **Collaborative improvement**

CommitSage combines powerful AI capabilities with thoughtful design to create an indispensable tool for modern software development, enhancing productivity while maintaining code quality and team collaboration.