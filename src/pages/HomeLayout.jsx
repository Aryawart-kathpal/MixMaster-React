import { Outlet, useNavigation } from "react-router-dom"
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  return (
    <>
      <Navbar/>
      <section className="page">
        {isPageLoading? <div className="loading"/>:<Outlet/>}
        {/* <Outlet/> Above or below the outlet we could keep the things that are constant for ex. navbar or footer */}
      </section>
    </>
  )
}
export default HomeLayout