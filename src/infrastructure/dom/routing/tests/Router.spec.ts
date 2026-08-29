import { describe, it, expect, beforeEach } from "bun:test";
import { LegacyHistoryManager } from "../entities/HistoryManager/LegacyHistoryManager";

describe("LegacyHistoryManager.matches", () => {
  let hm: LegacyHistoryManager;

  beforeEach(() => {
    hm = new LegacyHistoryManager();
  });

  const setPath = (path: string) => {
    location.href = `http://localhost${path}`;
  };

  describe("exact matching (flexible=false)", () => {
    it("should match an exact static path", () => {
      setPath("/users");
      expect(hm.matches("/users")).toBe(true);
    });

    it("should not match when location has extra segments", () => {
      setPath("/users/123");
      expect(hm.matches("/users")).toBe(false);
    });

    it("should match a dynamic segment", () => {
      setPath("/users/123");
      expect(hm.matches("/users/:id")).toBe(true);
    });

    it("should not match a different static segment", () => {
      setPath("/posts/123");
      expect(hm.matches("/users/:id")).toBe(false);
    });

    it("should match multiple dynamic segments", () => {
      setPath("/users/123/posts/456");
      expect(hm.matches("/users/:id/posts/:postId")).toBe(true);
    });

    it("should not match fewer segments than the pattern", () => {
      setPath("/users");
      expect(hm.matches("/users/:id")).toBe(false);
    });
  });

  describe("flexible matching (flexible=true)", () => {
    it("should match when location has extra segments", () => {
      setPath("/users/123/settings");
      expect(hm.matches("/users/:id", true)).toBe(true);
    });

    it("should match prefix with dynamic segment", () => {
      setPath("/users/123/posts/456");
      expect(hm.matches("/users/:id", true)).toBe(true);
    });

    it("should not match a different prefix", () => {
      setPath("/posts/123/settings");
      expect(hm.matches("/users/:id", true)).toBe(false);
    });

    it("should match exact path flexibly", () => {
      setPath("/users/123");
      expect(hm.matches("/users/:id", true)).toBe(true);
    });
  });

  describe("route specificity — more-specific routes match correctly", () => {
    it("both /users/:id and /users/:id/settings match flexibly", () => {
      setPath("/users/42/settings");

      expect(hm.matches("/users/:id", true)).toBe(true);
      expect(hm.matches("/users/:id/settings", true)).toBe(true);
    });

    it("only the specific route matches exactly", () => {
      setPath("/users/42/settings");

      expect(hm.matches("/users/:id")).toBe(false);
      expect(hm.matches("/users/:id/settings")).toBe(true);
    });

    it("/users/:id/profile and /users/:id/settings are distinguishable", () => {
      setPath("/users/42/settings");

      expect(hm.matches("/users/:id/profile", true)).toBe(false);
      expect(hm.matches("/users/:id/settings", true)).toBe(true);
    });

    it("longest match wins (simulates Router logic)", () => {
      setPath("/users/42/settings");

      const routes = [
        "/users/:id",
        "/users/:id/settings",
        "/users/:id/profile",
      ];

      let bestIndex = -1;
      let bestLength = -1;
      routes.forEach((route, i) => {
        if (hm.matches(route, true) && route.length > bestLength) {
          bestIndex = i;
          bestLength = route.length;
        }
      });

      expect(bestIndex).toBe(1); // /users/:id/settings
    });

    it("falls back to shorter route when no specific match exists", () => {
      setPath("/users/42/unknown");

      const routes = [
        "/users/:id",
        "/users/:id/settings",
        "/users/:id/profile",
      ];

      let bestIndex = -1;
      let bestLength = -1;
      routes.forEach((route, i) => {
        if (hm.matches(route, true) && route.length > bestLength) {
          bestIndex = i;
          bestLength = route.length;
        }
      });

      expect(bestIndex).toBe(0); // /users/:id (flexible match)
    });

    it("handles three levels of nesting", () => {
      setPath("/org/acme/users/42/settings");

      const routes = [
        "/org/:orgId",
        "/org/:orgId/users/:userId",
        "/org/:orgId/users/:userId/settings",
      ];

      let bestIndex = -1;
      let bestLength = -1;
      routes.forEach((route, i) => {
        if (hm.matches(route, true) && route.length > bestLength) {
          bestIndex = i;
          bestLength = route.length;
        }
      });

      expect(bestIndex).toBe(2);
    });
  });
});
