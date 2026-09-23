interface Props {
  params: Promise<{ postId: string }>;
}

const Post = async ({ params }: Props) => {
  const { postId } = await params;
  return <div>{postId}</div>;
};

export default Post;
