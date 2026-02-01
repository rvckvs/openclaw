/**
 * Example usage of @openclaw/gemini-cli-oauth
 *
 * This demonstrates how to use the standalone Gemini CLI OAuth package
 * in any Node.js project.
 */

import { loginGeminiCliOAuth, extractGeminiCliCredentials } from "@openclaw/gemini-cli-oauth";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// Example: Extract credentials from installed Gemini CLI
console.log("Attempting to extract Gemini CLI credentials...\n");
const extracted = extractGeminiCliCredentials();
if (extracted) {
  console.log("✓ Found Gemini CLI credentials:");
  console.log(`  Client ID: ${extracted.clientId}`);
  console.log(`  Client Secret: ${extracted.clientSecret.substring(0, 10)}...`);
  console.log();
} else {
  console.log("✗ Gemini CLI credentials not found");
  console.log("  Install Gemini CLI: brew install gemini-cli");
  console.log("  Or set GEMINI_CLI_OAUTH_CLIENT_ID environment variable\n");
}

// Example: Perform OAuth login
async function performLogin() {
  const rl = readline.createInterface({ input, output });

  try {
    console.log("Starting Gemini CLI OAuth login flow...\n");

    const credentials = await loginGeminiCliOAuth({
      isRemote: false,
      openUrl: async (url: string) => {
        console.log(`\nPlease open this URL in your browser:\n${url}\n`);
        // In a real application, you might use the 'open' package to open the URL
      },
      log: (msg: string) => console.log(msg),
      note: async (message: string, title?: string) => {
        if (title) {
          console.log(`\n${title}:`);
        }
        console.log(message);
      },
      prompt: async (message: string) => {
        const answer = await rl.question(message);
        return answer;
      },
      progress: {
        update: (msg: string) => console.log(`[Progress] ${msg}`),
        stop: (msg?: string) => {
          if (msg) {
            console.log(`[Done] ${msg}`);
          }
        },
      },
    });

    console.log("\n✓ Authentication successful!");
    console.log(`  Email: ${credentials.email || "N/A"}`);
    console.log(`  Project ID: ${credentials.projectId}`);
    console.log(`  Access token: ${credentials.access.substring(0, 20)}...`);
    console.log(`  Refresh token: ${credentials.refresh.substring(0, 20)}...`);
    console.log(`  Expires: ${new Date(credentials.expires).toISOString()}`);

    return credentials;
  } catch (error) {
    console.error("\n✗ Authentication failed:");
    console.error(error instanceof Error ? error.message : error);
    throw error;
  } finally {
    rl.close();
  }
}

// Uncomment to run the login flow:
// performLogin().catch(() => process.exit(1));

// Prevent unused function warning - this is an example file
void performLogin;

// For now, just show what would happen:
console.log("To run the login flow, uncomment the performLogin() call at the end of this file.");
console.log("\nUsage in your own project:");
console.log("  import { loginGeminiCliOAuth } from '@openclaw/gemini-cli-oauth';");
console.log("  const creds = await loginGeminiCliOAuth({ ... });");
