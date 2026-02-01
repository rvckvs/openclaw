# Google Gemini CLI Auth (OpenClaw plugin)

OAuth provider plugin for **Gemini CLI** (Google Code Assist).

This plugin integrates the standalone [@openclaw/gemini-cli-oauth](../../packages/gemini-cli-oauth) package into OpenClaw.

## Enable

Bundled plugins are disabled by default. Enable this one:

```bash
openclaw plugins enable google-gemini-cli-auth
```

Restart the Gateway after enabling.

## Authenticate

```bash
openclaw models auth login --provider google-gemini-cli --set-default
```

## Requirements

Requires the Gemini CLI to be installed (credentials are extracted automatically):

```bash
brew install gemini-cli
# or: npm install -g @google/gemini-cli
```

## Env vars (optional)

Override auto-detected credentials with:

- `OPENCLAW_GEMINI_OAUTH_CLIENT_ID` / `GEMINI_CLI_OAUTH_CLIENT_ID`
- `OPENCLAW_GEMINI_OAUTH_CLIENT_SECRET` / `GEMINI_CLI_OAUTH_CLIENT_SECRET`

## Using the Standalone Package

The OAuth logic is available as a standalone package that can be used in any Node.js project:

```bash
npm install @openclaw/gemini-cli-oauth
```

See the [@openclaw/gemini-cli-oauth package](../../packages/gemini-cli-oauth) for more details on using it independently.
