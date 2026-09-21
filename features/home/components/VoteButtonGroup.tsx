"use client";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useState } from "react";
import { getVotes, handleVote } from "../actions";
import { Post } from "../types";

interface Props {
  post: Post;
  votes: number;
  userVoteStatus: number;
}
const VoteButtonGroup = ({ post, votes, userVoteStatus }: Props) => {
  const [voteStatus, setVoteStatus] = useState(userVoteStatus);
  const [noOfVotes, setNoOfVotes] = useState(votes);

  const hancleUpvoteClick = async () => {
    setVoteStatus((prev) => (prev === 1 ? 0 : 1));
    await handleVote("UPVOTE", post.id);
    setNoOfVotes(await getVotes(post.id));
  };
  const handleDownvoteClick = async () => {
    setVoteStatus((prev) => (prev === -1 ? 0 : -1));
    await handleVote("DOWNVOTE", post.id);
    setNoOfVotes(await getVotes(post.id));
  };
  return (
    <ButtonGroup>
      <Button variant={"outline"} onClick={hancleUpvoteClick}>
        <ArrowBigUp
          size={16}
          className={voteStatus === 1 ? "text-green-500 fill-green-500" : ""}
        />
        <span>{noOfVotes}</span>
      </Button>
      <Button variant={"outline"} onClick={handleDownvoteClick}>
        <ArrowBigDown
          size={16}
          className={voteStatus === -1 ? "text-red-500 fill-red-500" : ""}
        />
      </Button>
    </ButtonGroup>
  );
};

export default VoteButtonGroup;
