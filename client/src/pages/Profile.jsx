import { useEffect, useState } from "react";
import api from "../utils/axios";
import useAuthStore from "../store/useAuthStore";
import Stat from "../components/Stat";
import useGigStore from "../store/useGigStore";
import useBidStore from "../store/useBidStore";
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';

const Profile = () => {
  const { user, logout } = useAuthStore();
  const [gigs, setGigs] = useState([]);
  const [bids, setBids] = useState([]);
  const [tab, setTab] = useState("gigs");
  const { myGigs } = useGigStore();
  const { myBids } = useBidStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const fetchedGigs = await myGigs();
      const fetchedBids = await myBids();
      setGigs(fetchedGigs);
      setBids(fetchedBids);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-12 md:pt-24 px-6">
      <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-xl px-4 py-6 md:p-6 flex items-baseline justify-between md:items-center gap-4 flex-col md:flex-row">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 text-white flex items-center justify-center rounded-full text-xl font-bold ">
            {user.name.charAt(0) + " " + user.name.split(" ")[1]?.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-slate-900">{user.name}</p>
            <p className="text-sm text-slate-500">{user.email}</p>
            <div className="mt-1 flex gap-2">
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                Client
              </span>
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                Freelancer
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className=" ml-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Stat label="Gigs Posted" value={gigs?.length} />
        <Stat label="Bids Made" value={bids?.length} />
        <Stat
          label="Hired"
          value={bids?.filter((b) => b.status === "hired")?.length}
        />
        <Stat
          label="Active Gigs"
          value={gigs?.filter((g) => g.status === "open")?.length}
        />
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto mt-10">
        <div className="flex gap-6 border-b border-slate-200">
          <button
            onClick={() => setTab("gigs")}
            className={`pb-2 cursor-pointer ${
              tab === "gigs"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-slate-500"
            }`}
          >
            My Gigs
          </button>
          <button
            onClick={() => setTab("bids")}
            className={`pb-2 cursor-pointer ${
              tab === "bids"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-slate-500"
            }`}
          >
            My Bids
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {tab === "gigs" &&
            gigs?.map((g) => (
              <button
                key={g._id}
                className="bg-white border border-slate-200 rounded-lg p-4 flex justify-between w-full cursor-pointer"
                onClick={() => navigate(`/gig-bids/${g._id}`)}
              >
                <div className="flex flex-col items-baseline">
                  <p className="font-medium text-slate-900">{g.title}</p>
                  <p className="text-sm text-slate-500">₹{g.budget}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded text-sm flex items-center justify-center ${
                    g.status === "open"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {g.status}
                </span>
              </button>
            ))}

          {tab === "bids" &&
            bids?.map((b) => (
              <div
                key={b._id}
                className="bg-white border border-slate-200 rounded-lg p-4 flex justify-between"
              >
                <div>
                  <p className="font-medium text-slate-900">{b.gig?.title}</p>
                  <p className="text-sm text-slate-500">₹{b.price}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded text-sm flex items-center justify-center
                    ${
                      b.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : b.status === "hired"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                      `}
                >
                  {b.status}
                </span>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
