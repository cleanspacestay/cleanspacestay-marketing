import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import privatePageAccess, { __test, config as middlewareConfig } from "./middleware.js";

const repoRoot = process.cwd();
const TEST_PASSWORD = "correct-horse-for-source-contracts";
const TEST_HASH = createHash("sha256").update(TEST_PASSWORD, "utf8").digest("hex");

function request({ authorization, ip = "192.0.2.10", method = "GET" } = {}) {
  const headers = new Headers({ "x-real-ip": ip });
  if (authorization) headers.set("authorization", authorization);
  return new Request("https://cleanspacestay.com/value-calculator", { method, headers });
}

function basic(username, password) {
  return `Basic ${Buffer.from(`${username}:${password}`, "utf8").toString("base64")}`;
}

beforeEach(() => {
  process.env.MARKETING_PRIVATE_ACCESS_SHA256 = TEST_HASH;
});

afterEach(() => {
  delete process.env.MARKETING_PRIVATE_ACCESS_SHA256;
});

describe("private marketing page access", () => {
  it("fails closed when the server-side hash is absent or malformed", () => {
    delete process.env.MARKETING_PRIVATE_ACCESS_SHA256;
    expect(privatePageAccess(request({ ip: "192.0.2.11" })).status).toBe(503);

    process.env.MARKETING_PRIVATE_ACCESS_SHA256 = "not-a-sha256";
    expect(privatePageAccess(request({ ip: "192.0.2.12" })).status).toBe(503);
  });

  it("challenges missing or incorrect credentials without caching the response", () => {
    const missing = privatePageAccess(request({ ip: "192.0.2.13" }));
    expect(missing.status).toBe(401);
    expect(missing.headers.get("www-authenticate")).toMatch(/^Basic /);
    expect(missing.headers.get("cache-control")).toContain("no-store");

    const incorrect = privatePageAccess(request({
      authorization: basic(__test.ACCESS_USER, "incorrect"),
      ip: "192.0.2.14",
    }));
    expect(incorrect.status).toBe(401);
  });

  it("continues to the static route only for the expected username and password", () => {
    const response = privatePageAccess(request({
      authorization: basic(__test.ACCESS_USER, TEST_PASSWORD),
      ip: "192.0.2.15",
    }));

    expect(response.status).toBe(200);
    expect(response.headers.get("x-middleware-next")).toBe("1");
    expect(response.headers.get("cache-control")).toContain("no-store");
  });

  it("throttles repeated failed credentials within a bounded window", () => {
    const ip = "192.0.2.16";
    for (let attempt = 0; attempt < __test.MAX_FAILURES_PER_WINDOW; attempt += 1) {
      expect(privatePageAccess(request({ authorization: basic(__test.ACCESS_USER, "wrong"), ip })).status).toBe(401);
    }

    const limited = privatePageAccess(request({ authorization: basic(__test.ACCESS_USER, TEST_PASSWORD), ip }));
    expect(limited.status).toBe(429);
    expect(Number(limited.headers.get("retry-after"))).toBeGreaterThan(0);
  });

  it("rejects non-read methods", () => {
    const response = privatePageAccess(request({ method: "POST", ip: "192.0.2.17" }));
    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("GET, HEAD");
  });

  it("contains no client-side access credential or unlock gate in served HTML", () => {
    const files = [
      "value-calculator.html",
      "rollout.html",
      "executive-briefing.html",
      "demo-script.html",
      "platform-overview.html",
    ];
    const forbidden = /(?:PASSWORD\s*=|input\s+type=["']password|sessionStorage|localStorage\.setItem\([^)]*(?:auth|unlock)|checkGate|vc-gate)/i;

    for (const file of files) {
      const html = fs.readFileSync(path.join(repoRoot, file), "utf8");
      expect(html, file).not.toMatch(forbidden);
    }

    expect(fs.existsSync(path.join(repoRoot, "public/value-calculator.html"))).toBe(false);
    expect(fs.existsSync(path.join(repoRoot, "public/executive-briefing.html"))).toBe(false);
  });

  it("protects every canonical route and defensive legacy alias through the root Routing Middleware convention", () => {
    const vercelConfig = JSON.parse(fs.readFileSync(path.join(repoRoot, "vercel.json"), "utf8"));
    expect(vercelConfig.proxy).toBeUndefined();
    expect(fs.existsSync(path.join(repoRoot, "middleware.js"))).toBe(true);
    expect(fs.existsSync(path.join(repoRoot, "proxy.js"))).toBe(false);
    expect(middlewareConfig.matcher).toEqual(expect.arrayContaining([
      "/value-calculator/:path*",
      "/value-calculator.html",
      "/rollout/:path*",
      "/rollout.html",
      "/executive-briefing/:path*",
      "/executive-briefing.html",
      "/demo-script/:path*",
      "/demo-script.html",
      "/platform-overview/:path*",
      "/platform-overview.html",
      "/public/value-calculator/:path*",
      "/public/value-calculator.html",
      "/public/executive-briefing/:path*",
      "/public/executive-briefing.html",
    ]));
  });
});
