import Amenities from "../../components/website/home/Amenities";
import Hero from "../../components/website/home/Hero";
import Rooms from "../../components/website/home/Rooms";
import StayBanner from "../../components/website/home/StayBanner";
import Story from "../../components/website/home/Story";

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <Rooms />
      <Amenities />
      <StayBanner />
    </main>
  );
}
