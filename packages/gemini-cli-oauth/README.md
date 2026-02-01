# @openclaw/gemini-cli-oauth

Standalone OAuth module for authenticating with Google's Gemini CLI (Google Code Assist). This package extracts the reusable authentication logic in a modular way that can be integrated into any Node.js project.

## Features

- 🔐 **OAuth 2.0 PKCE Flow**: Secure authentication using PKCE (Proof Key for Code Exchange)
- 🔧 **Auto-detection**: Automatically extracts OAuth credentials from an installed Gemini CLI
- 🌐 **Remote & Local Support**: Works both in local environments and remote/VPS environments with manual flow
- 🎯 **TypeScript**: Fully typed for better developer experience
- 📦 **Zero Dependencies**: Pure Node.js implementation with no external runtime dependencies

## Installation

```bash
npm install @openclaw/gemini-cli-oauth
```

## Prerequisites

The module can work in two ways:

1. **Auto-detection mode**: If you have Gemini CLI installed, it will automatically extract OAuth credentials
   ```bash
   brew install gemini-cli
   # or
   npm install -g @google/gemini-cli
   ```

2. **Manual credentials mode**: Set environment variables to provide your own OAuth credentials
   ```bash
   export GEMINI_CLI_OAUTH_CLIENT_ID="your-client-id"
   export GEMINI_CLI_OAUTH_CLIENT_SECRET="your-client-secret"
   ```

## Usage

### Basic Authentication

```typescript
import { loginGeminiCliOAuth } from '@openclaw/gemini-cli-oauth';

const credentials = await loginGeminiCliOAuth({
  isRemote: false,
  openUrl: async (url) => {
    // Open the URL in a browser
    console.log('Open this URL:', url);
  },
  log: (msg) => console.log(msg),
  note: async (message, title) => {
    console.info(title ? `${title}: ${message}` : message);
  },
  prompt: async (message) => {
    // Get user input (e.g., using readline or a prompt library)
    return await getUserInput(message);
  },
  progress: {
    update: (msg) => console.log('Progress:', msg),
    stop: (msg) => console.log('Done:', msg),
  },
});

console.log('Authentication successful!');
console.log('Access token:', credentials.access);
console.log('Refresh token:', credentials.refresh);
console.log('Email:', credentials.email);
console.log('Project ID:', credentials.projectId);
console.log('Expires at:', new Date(credentials.expires));
```

### Extract Credentials from Gemini CLI

```typescript
import { extractGeminiCliCredentials } from '@openclaw/gemini-cli-oauth';

const creds = extractGeminiCliCredentials();
if (creds) {
  console.log('Found Gemini CLI credentials:');
  console.log('Client ID:', creds.clientId);
  console.log('Client Secret:', creds.clientSecret);
} else {
  console.log('Gemini CLI not found or credentials could not be extracted');
}
```

## API Reference

### `loginGeminiCliOAuth(ctx: GeminiCliOAuthContext): Promise<GeminiCliOAuthCredentials>`

Main authentication function that performs the OAuth flow.

**Parameters:**
- `ctx.isRemote`: Boolean indicating if running in a remote environment (triggers manual flow)
- `ctx.openUrl`: Function to open URLs in a browser
- `ctx.log`: Logging function for informational messages
- `ctx.note`: Function to display important notes to the user
- `ctx.prompt`: Function to prompt user for input
- `ctx.progress`: Object with `update` and `stop` methods for progress indication

**Returns:** Promise resolving to `GeminiCliOAuthCredentials` object containing:
- `access`: Access token
- `refresh`: Refresh token
- `expires`: Expiration timestamp (milliseconds)
- `email`: User's email address (optional)
- `projectId`: Google Cloud project ID

### `extractGeminiCliCredentials(): { clientId: string; clientSecret: string } | null`

Extracts OAuth credentials from the installed Gemini CLI's bundled files.

**Returns:** Object with `clientId` and `clientSecret`, or `null` if not found.

### `clearCredentialsCache(): void`

Clears the internal credentials cache. Useful for testing or forcing re-extraction.

## Environment Variables

The module checks the following environment variables (in order):

**Client ID:**
1. `OPENCLAW_GEMINI_OAUTH_CLIENT_ID`
2. `GEMINI_CLI_OAUTH_CLIENT_ID`

**Client Secret:**
1. `OPENCLAW_GEMINI_OAUTH_CLIENT_SECRET`
2. `GEMINI_CLI_OAUTH_CLIENT_SECRET`

**Google Cloud Project (optional):**
- `GOOGLE_CLOUD_PROJECT`
- `GOOGLE_CLOUD_PROJECT_ID`

## How It Works

1. **Credential Resolution**: The module first checks environment variables, then tries to extract credentials from an installed Gemini CLI
2. **PKCE Flow**: Generates a code verifier and challenge for secure OAuth
3. **Local Callback Server**: Starts a localhost server on port 8085 to capture the OAuth callback (automatic mode)
4. **Manual Flow**: For remote/VPS environments, provides a URL for the user to open and paste back the callback URL
5. **Token Exchange**: Exchanges the authorization code for access and refresh tokens
6. **Project Discovery**: Automatically discovers or provisions a Google Cloud project for the account

## License

MIT

## Contributing

Contributions are welcome! This module is designed to be standalone and reusable in any project that needs Gemini CLI authentication.
