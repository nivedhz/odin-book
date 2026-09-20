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
  userUpvoteStatus: boolean;
  userDownvoteStatus: boolean;
}
const VoteButtonGroup = ({
  post,
  votes,
  userUpvoteStatus,
  userDownvoteStatus,
}: Props) => {
  const [upvoted, setUpvoted] = useState(userUpvoteStatus);
  const [downVoted, setDownvoted] = useState(userDownvoteStatus);
  const [noOfVotes, setNoOfVotes] = useState(votes);

  return (
    <ButtonGroup>
      <Button
        variant={"outline"}
        onClick={async () => {
          setDownvoted(false);
          setUpvoted(!upvoted);
          await handleUpvote(post.id);
          setNoOfVotes(() => (upvoted ? noOfVotes - 1 : noOfVotes + 1));
        }}
      >
        <ArrowBigUp
          size={16}
          className={upvoted ? "text-green-500 fill-green-500" : ""}
        />
        {noOfVotes}
      </Button>
      <Button
        variant={"outline"}
        onClick={async () => {
          setUpvoted(false);
          setDownvoted(!downVoted);
          setNoOfVotes(() => (downVoted ? noOfVotes + 1 : noOfVotes - 1));
          await handleDownvote(post.id);
        }}
      >
        <ArrowBigDown
          size={16}
          className={downVoted ? "text-red-500 fill-red-500" : ""}
        />
      </Button>
    </ButtonGroup>
  );
};

export default VoteButtonGroup;
