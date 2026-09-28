import { getUserVote, getVotes, handleVote } from "@/features/post/actions";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));
vi.mock("@/lib/auth/session", () => ({
  getSession: vi.fn(),
}));
vi.mock("@/lib/prisma", () => ({
  prisma: {
    vote: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

afterEach(() => {
  vi.resetAllMocks();
});

describe("Post Logic", () => {
  describe("getVotes", () => {
    it("Initial getVotes returns 0", async () => {
      vi.mocked(prisma.vote.findMany).mockResolvedValue([]);
      vi.mocked(getSession).mockResolvedValue({
        userId: "1",
      });

      await expect(getVotes("1")).resolves.toBe(0);
    });
    it("The value of upvotes are counted correctly", async () => {
      vi.mocked(prisma.vote.findMany).mockResolvedValue([
        {
          type: "UPVOTE",
        },
        {
          type: "UPVOTE",
        },
        {
          type: "UPVOTE",
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any);
      vi.mocked(getSession).mockResolvedValue({
        userId: "1",
      });

      await expect(getVotes("1")).resolves.toBe(3);
    });
    it("The value of downvotes are counted correctly", async () => {
      vi.mocked(prisma.vote.findMany).mockResolvedValue([
        {
          type: "DOWNVOTE",
        },
        {
          type: "DOWNVOTE",
        },
        {
          type: "DOWNVOTE",
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any);
      vi.mocked(getSession).mockResolvedValue({
        userId: "1",
      });

      await expect(getVotes("1")).resolves.toBe(-3);
    });
    it("The final values is in upvote - downvote form", async () => {
      vi.mocked(prisma.vote.findMany).mockResolvedValue([
        {
          type: "DOWNVOTE",
        },
        {
          type: "DOWNVOTE",
        },
        {
          type: "DOWNVOTE",
        },
        {
          type: "UPVOTE",
        },
        {
          type: "UPVOTE",
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any);
      vi.mocked(getSession).mockResolvedValue({
        userId: "1",
      });

      await expect(getVotes("1")).resolves.toBe(-1);
    });
  });
  describe("getUserVote", () => {
    it("Returns 0 on initial state", async () => {
      vi.mocked(prisma.vote.findUnique).mockResolvedValue(null);
      vi.mocked(getSession).mockResolvedValue({
        userId: "1",
      });

      await expect(getUserVote("1")).resolves.toBe(0);
    });
    it("Returns 1 on upvoted state", async () => {
      vi.mocked(prisma.vote.findUnique).mockResolvedValue({
        type: "UPVOTE",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      vi.mocked(getSession).mockResolvedValue({
        userId: "1",
      });

      await expect(getUserVote("1")).resolves.toBe(1);
    });
    it("Returns -1 on downvoted state", async () => {
      vi.mocked(prisma.vote.findUnique).mockResolvedValue({
        type: "DOWNVOTE",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      vi.mocked(getSession).mockResolvedValue({
        userId: "1",
      });

      await expect(getUserVote("1")).resolves.toBe(-1);
    });
    it("Returns 0 on unvoted state", async () => {
      vi.mocked(prisma.vote.findUnique).mockResolvedValue(null);
      vi.mocked(getSession).mockResolvedValue({
        userId: "1",
      });

      await expect(getUserVote("1")).resolves.toBe(0);
    });
    it("Returns 0 on absence of session", async () => {
      vi.mocked(prisma.vote.findUnique).mockResolvedValue(null);
      vi.mocked(getSession).mockResolvedValue(null);

      await expect(getUserVote("1")).resolves.toBe(0);
    });
  });
  describe("handleVote", () => {
    it("Deletes vote if user already voted", async () => {
      vi.mocked(prisma.vote.findUnique).mockResolvedValue({
        type: "UPVOTE",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      vi.mocked(getSession).mockResolvedValue({
        userId: "1",
      });

      await handleVote("UPVOTE", "1");
      expect(prisma.vote.delete).toHaveBeenCalled();
    });
    it("Creates vote if user has not voted", async () => {
      vi.mocked(prisma.vote.findUnique).mockResolvedValue(null);
      vi.mocked(prisma.vote.create).mockResolvedValue({
        type: "UPVOTE",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      vi.mocked(getSession).mockResolvedValue({
        userId: "1",
      });

      await handleVote("UPVOTE", "1");
      expect(prisma.vote.create).toHaveBeenCalled();
    });
    it("Deletes the vote and creates a new vote if the type of the new and old votes are not same", async () => {
      vi.mocked(prisma.vote.findUnique).mockResolvedValue({
        type: "DOWNVOTE",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      vi.mocked(prisma.vote.create).mockResolvedValue({
        type: "UPVOTE",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      vi.mocked(getSession).mockResolvedValue({
        userId: "1",
      });

      await handleVote("UPVOTE", "1");
      expect(prisma.vote.delete).toHaveBeenCalledOnce();
      expect(prisma.vote.create).toHaveBeenCalledOnce();
    });
    it("Deletes the vote when the type of the new and old votes are same", async () => {
      vi.mocked(prisma.vote.findUnique).mockResolvedValue({
        type: "DOWNVOTE",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      vi.mocked(prisma.vote.create).mockResolvedValue({
        type: "DOWNVOTE",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      vi.mocked(getSession).mockResolvedValue({
        userId: "1",
      });

      await handleVote("UPVOTE", "1");
      expect(prisma.vote.delete).toHaveBeenCalledOnce();
      expect(prisma.vote.create).not.toHaveBeenCalledTimes(2);
    });
    it("Redirects to login if user is not logged in", async () => {
      vi.mocked(prisma.vote.findUnique).mockResolvedValue(null);
      vi.mocked(prisma.vote.create).mockResolvedValue({
        type: "UPVOTE",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      vi.mocked(getSession).mockResolvedValue({});

      await handleVote("UPVOTE", "1");
      expect(redirect).toHaveBeenCalledWith("/login");
    });
  });
});
