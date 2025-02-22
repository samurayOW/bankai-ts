import Header from "./Header";
import NewArrivals from "./NewArrivals";
import OurBenefits from "./OurBenefits";
import Genres from "./Genres";
import Customers from "./Customers";

export default function Home(): JSX.Element {
  return (
    <>
      <Header />
      <NewArrivals />
      <OurBenefits />
      <Genres />
      <Customers />
    </>
  );
}
