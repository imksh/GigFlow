import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import useAuthStore from "./store/useAuthStore";
import UserHeader from "./components/userHeader";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Gig from "./pages/Gig";
import Loading from "./components/Loading";
import useGigStore from "./store/useGigStore";
import useBidStore from "./store/useBidStore";
import useUiStore from "./store/useUiStore";
import GigBids from "./pages/GigBids";
import Landing from "./pages/Landing";
import Gigs from "./pages/Gigs";
import Bids from "./pages/Bids";

const App = () => {
  const { checkAuth, user, isChecking } = useAuthStore();
  const { myGigs } = useGigStore();
  const { myBids } = useBidStore();
  const {
    setGigsPosted,
    setBidsMade,
    setHired,
    setActiveGigs,
    setShowHeader,
    setActiveBids,
  } = useUiStore();
  useEffect(() => {
    const fun = async () => {
      await checkAuth();
    };
    fun();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const fetchedGigs = await myGigs();
      const fetchedBids = await myBids();
      const h = fetchedBids.filter((i) => i.status === "hired");
      const activeGig = fetchedGigs.filter((i) => i.status === "open");
      const activeBid = fetchedBids.filter((i) => i.status === "pending");
      setActiveGigs(activeGig.length);
      setActiveBids(activeBid.length);
      setHired(h.length);
      setGigsPosted(fetchedGigs.length);
      setBidsMade(fetchedBids.length);
    };
    fetch();
  }, []);

  if (isChecking) {
    return <Loading />;
  }

  return (
    <div
      onClick={() => {
        setShowHeader(false);
      }}
      className="hide-scrollbar"
    >
      {user ? <UserHeader /> : <Header />}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Landing />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/about" element={user ? <Home /> : <About />} />
        <Route path="/contact" element={user ? <Home /> : <Contact />} />
        <Route path="/profile" element={user ? <Profile /> : <Login />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Contact />} />
        <Route path="/gigs/:id" element={user ? <Gig /> : <Login />} />
        <Route path="/gig-bids/:id" element={user ? <GigBids /> : <Login />} />
        <Route path="/gigs" element={user ? <Gigs /> : <Login />} />
        <Route path="/bids" element={user ? <Bids /> : <Login />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
