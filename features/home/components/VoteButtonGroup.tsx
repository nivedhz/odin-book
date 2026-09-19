"use client";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { useState } from "react";

const VoteButtonGroup = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  return (
    <ButtonGroup>
      <Button
        variant={"outline"}
        onClick={() => {
          setLiked(!liked);
          setDisliked(false);
        }}
      >
        <ArrowBigUp
          size={16}
          className={liked ? "text-green-500 fill-green-500" : ""}
        />
      </Button>
      <Button
        variant={"outline"}
        onClick={() => {
          setLiked(false);
          setDisliked(!disliked);
        }}
      >
        <ArrowBigDown
          size={16}
          className={disliked ? "text-red-500 fill-red-500" : ""}
        />
      </Button>
    </ButtonGroup>
  );
};

export default VoteButtonGroup;
