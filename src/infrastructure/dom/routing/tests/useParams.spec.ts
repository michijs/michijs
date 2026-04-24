import { describe, it, expect } from "bun:test";
import { extractParams } from "../hooks/useParams";

describe("extractParams", () => {
  const setPath = (path: string) => {
    location.href = `http://localhost${path}`;
  };

  describe("single dynamic segment", () => {
    it("should extract :id from /users/:id", () => {
      setPath("/users/42");
      expect(extractParams("/users/:id")).toEqual({ id: "42" });
    });

    it("should extract :id with different values", () => {
      setPath("/users/abc");
      expect(extractParams("/users/:id")).toEqual({ id: "abc" });
    });

    it("should return empty object when pattern has no params", () => {
      setPath("/users/42");
      expect(extractParams("/users/list")).toEqual({});
    });
  });

  describe("multiple dynamic segments", () => {
    it("should extract :id and :postId", () => {
      setPath("/users/42/posts/99");
      expect(extractParams("/users/:id/posts/:postId")).toEqual({
        id: "42",
        postId: "99",
      });
    });

    it("should extract three params", () => {
      setPath("/org/acme/users/42/posts/7");
      expect(extractParams("/org/:orgId/users/:userId/posts/:postId")).toEqual({
        orgId: "acme",
        userId: "42",
        postId: "7",
      });
    });
  });

  describe("partial match (location longer than pattern)", () => {
    it("should extract params from prefix segments only", () => {
      setPath("/users/42/settings/advanced");
      expect(extractParams("/users/:id")).toEqual({ id: "42" });
    });
  });

  describe("location shorter than pattern", () => {
    it("should only extract params for segments that exist", () => {
      setPath("/users");
      expect(extractParams("/users/:id/posts/:postId")).toEqual({});
    });

    it("should extract partial params when some segments exist", () => {
      setPath("/users/42");
      expect(extractParams("/users/:id/posts/:postId")).toEqual({ id: "42" });
    });
  });

  describe("no leading slash", () => {
    it("should work without leading slash in pattern", () => {
      setPath("/users/42");
      expect(extractParams("users/:id")).toEqual({ id: "42" });
    });
  });

  describe("with parentRoute", () => {
    it("should prepend parent pathname", () => {
      setPath("/app/v2/users/42");
      const parentRoute = () => new URL("http://localhost/app/v2");
      expect(extractParams("/users/:id", parentRoute)).toEqual({ id: "42" });
    });

    it("should extract params from parent pattern too", () => {
      setPath("/org/acme/users/42");
      const parentRoute = () => new URL("http://localhost/org/acme");
      expect(extractParams("/users/:id", parentRoute)).toEqual({ id: "42" });
    });
  });

  describe("edge cases", () => {
    it("should return empty object for root path", () => {
      setPath("/");
      expect(extractParams("/")).toEqual({});
    });

    it("should handle trailing slashes in location", () => {
      setPath("/users/42/");
      expect(extractParams("/users/:id")).toEqual({ id: "42" });
    });

    it("should not extract static segments", () => {
      setPath("/users/42/profile");
      const result = extractParams("/users/:id/profile");
      expect(result).toEqual({ id: "42" });
      expect(result).not.toHaveProperty("profile");
    });
  });
});
