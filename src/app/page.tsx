import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
// import UserProfile from "./components/Profile";

export default function Lander() {
  return (
    <>
      <Header />
      <Banner />
      <Home />
      <Footer />
      {/* <UserProfile /> */}
    </>
  );
}
