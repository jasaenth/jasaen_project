import PageHero from "@/components/common/PageHero";
import RoomDetails from "@/components/website/rooms/RoomDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <RoomDetails id={id} />;
  
  
}