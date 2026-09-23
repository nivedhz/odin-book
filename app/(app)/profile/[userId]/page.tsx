interface Props {
  params: Promise<{ userId: string }>;
}

const page = async ({ params }: Props) => {
  const { userId } = await params;
  return <div>profile/{userId}</div>;
};

export default page;
