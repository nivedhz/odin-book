"use client";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useState } from "react";
import { handleDownvote, handleUpvote } from "../actions";
import { Post } from "../types";

interface Props {
  post: Post;
  votes: number;
  userVoteStatus: number;
}
const VoteButtonGroup = ({ post, votes, userVoteStatus }: Props) => {
  const [voteStatus, setVoteStatus] = useState(userVoteStatus);
  const [noOfVotes, setNoOfVotes] = useState(votes);

  return (
    <ButtonGroup>
      <Button
        variant={"outline"}
        onClick={async () => {
          setVoteStatus((prev) => (prev === 1 ? 0 : 1));
          await handleUpvote(post.id);
          setNoOfVotes(() =>
            voteStatus === 1 ? noOfVotes - 1 : noOfVotes + 1,
          );
        }}
      >
        <ArrowBigUp
          size={16}
          className={voteStatus === 1 ? "text-green-500 fill-green-500" : ""}
        />
        <span>{noOfVotes}</span>
      </Button>
      <Button
        variant={"outline"}
        onClick={async () => {
          setVoteStatus((prev) => (prev === -1 ? 0 : -1));
          setNoOfVotes(() => (voteStatus === -1 ? noOfVotes : noOfVotes - 1));
          await handleDownvote(post.id);
        }}
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
