"use client";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useState, useTransition } from "react";
import { Post } from "../types";
import { getVotes, handleVote } from "@/features/post/actions";

interface Props {
  post: Post;
  votes: number;
  userVoteStatus: number;
}
const VoteButtonGroup = ({ post, votes, userVoteStatus }: Props) => {
  const [voteStatus, setVoteStatus] = useState(userVoteStatus);
  const [noOfVotes, setNoOfVotes] = useState(votes);
  const [isPending, startTransition] = useTransition();

  const handleUpvoteClick = async () => {
    setVoteStatus((prev) => (prev === 1 ? 0 : 1));
    startTransition(async () => {
      await handleVote("UPVOTE", post.id);
      setNoOfVotes(await getVotes(post.id));
    });
  };
  const handleDownvoteClick = async () => {
    setVoteStatus((prev) => (prev === -1 ? 0 : -1));
    startTransition(async () => {
      await handleVote("DOWNVOTE", post.id);
      setNoOfVotes(await getVotes(post.id));
    });
  };
  return (
    <ButtonGroup>
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={handleUpvoteClick}
        disabled={isPending}
        aria-label={`Upvote ${post.title}`}
      >
        <ArrowBigUp
          size={16}
          className={voteStatus === 1 ? "text-green-500 fill-green-500" : ""}
        />
        <span className="tabular-nums">{noOfVotes}</span>
      </Button>
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={handleDownvoteClick}
        disabled={isPending}
        aria-label={`Downvote ${post.title}`}
      >
        <ArrowBigDown
          size={16}
          className={voteStatus === -1 ? "text-red-500 fill-red-500" : ""}
        />
      </Button>
    </ButtonGroup>
  );
};

export default VoteButtonGroup;
