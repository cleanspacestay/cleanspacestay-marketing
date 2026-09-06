import { createHash, timingSafeEqual } from "node:crypto";
import { next } from "@vercel/functions";

const ACCESS_USER = "cleanspacestay";
const HASH_PATTERN = /^[a-f0-9]{64}$/i;
const MAX_AUTHORIZATION_LENGTH = 1024;
const MAX_FAILURES_PER_WINDOW = 10;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const MAX_TRACKED_CLIENTS = 1024;
const failureWindows = new Map();

function securityHeaders(extra = {}) {
  return {
    "Cache-Control": "private, no-store, max-age=0",
    Pragma: "no-cache",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    ...extra,
  };
}

function textResponse(message, status, extraHeaders = {}) {
  return new Response(message, {
    status,
    headers: securityHeaders({
      "Content-Type": "text/plain; charset=utf-8",
      ...extraHeaders,
    }),
  });
}

function unauthorizedResponse() {
  return textResponse("Authentication required.", 401, {
    "WWW-Authenticate": 'Basic realm="CleanSpace Stay Private", charset="UTF-8"',
  });
}

function parseBasicCredentials(header) {
  if (!header || header.length > MAX_AUTHORIZATION_LENGTH) return null;
  const match = /^Basic ([A-Za-z0-9+/]+={0,2})$/.exec(header);
  if (!match) return null;

  try {
    const decoded = Buffer.from(match[1], "base64").toString("utf8");
    const separator = decoded.indexOf(":");
    if (separator < 1) return null;
    return {
      username: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

function isValidPassword(password, expectedHash) {
  if (!HASH_PATTERN.test(expectedHash)) return false;
  const actual = Buffer.from(createHash("sha256").update(password, "utf8").digest("hex"), "hex");
  const expected = Buffer.from(expectedHash.toLowerCase(), "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function clientKey(request) {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",", 1)[0]?.trim() ||
    "unknown"
  );
}

function currentFailureWindow(key, now) {
  const existing = failureWindows.get(key);
  if (!existing || now - existing.startedAt >= RATE_WINDOW_MS) {
    return { startedAt: now, failures: 0 };
  }
  return existing;
}

function recordFailure(key, now) {
  if (failureWindows.size >= MAX_TRACKED_CLIENTS && !failureWindows.has(key)) {
    for (const [candidate, window] of failureWindows) {
      if (now - window.startedAt >= RATE_WINDOW_MS) failureWindows.delete(candidate);
      if (failureWindows.size < MAX_TRACKED_CLIENTS) break;
    }
  }

  const window = currentFailureWindow(key, now);
  window.failures += 1;
  failureWindows.set(key, window);
  return window;
}

export default function privatePageAccess(request) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return textResponse("Method not allowed.", 405, { Allow: "GET, HEAD" });
  }

  const expectedHash = process.env.MARKETING_PRIVATE_ACCESS_SHA256?.trim() ?? "";
  if (!HASH_PATTERN.test(expectedHash)) {
    return textResponse("Private page access is not configured.", 503);
  }

  const now = Date.now();
  const key = clientKey(request);
  const window = currentFailureWindow(key, now);
  if (window.failures >= MAX_FAILURES_PER_WINDOW) {
    const retryAfterSeconds = Math.max(1, Math.ceil((RATE_WINDOW_MS - (now - window.startedAt)) / 1000));
    return textResponse("Too many authentication attempts. Try again later.", 429, {
      "Retry-After": String(retryAfterSeconds),
    });
  }

  const credentials = parseBasicCredentials(request.headers.get("authorization"));
  if (
    credentials?.username === ACCESS_USER &&
    isValidPassword(credentials.password, expectedHash)
  ) {
    failureWindows.delete(key);
    return next({
      headers: securityHeaders(),
    });
  }

  recordFailure(key, now);
  return unauthorizedResponse();
}

export const __test = {
  ACCESS_USER,
  MAX_FAILURES_PER_WINDOW,
  RATE_WINDOW_MS,
  isValidPassword,
  parseBasicCredentials,
};
