/**
 * @openclaw/gemini-cli-oauth
 *
 * Standalone OAuth module for Gemini CLI authentication.
 * Can be used in any Node.js project that needs to authenticate with Google's Gemini CLI.
 *
 * @example
 * ```typescript
 * import { loginGeminiCliOAuth, extractGeminiCliCredentials } from '@openclaw/gemini-cli-oauth';
 *
 * const credentials = await loginGeminiCliOAuth({
 *   isRemote: false,
 *   openUrl: async (url) => { console.log('Open:', url) },
 *   log: (msg) => console.log(msg),
 *   note: async (msg) => console.info(msg),
 *   prompt: async (msg) => { return await getUserInput(msg) },
 *   progress: { update: (msg) => console.log(msg), stop: (msg) => console.log(msg) }
 * });
 *
 * console.log('Access token:', credentials.access);
 * console.log('Refresh token:', credentials.refresh);
 * console.log('Project ID:', credentials.projectId);
 * ```
 */

export {
  loginGeminiCliOAuth,
  extractGeminiCliCredentials,
  clearCredentialsCache,
  type GeminiCliOAuthCredentials,
  type GeminiCliOAuthContext,
} from "./oauth.js";
