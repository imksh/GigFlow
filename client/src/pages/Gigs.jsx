import { useEffect, useState } from "react";
import useGigStore from "../store/useGigStore";
import { useNavigate } from "react-router-dom";

const Gigs = () => {
  const [gigs, setGigs] = useState([]);
  const { myGigs } = useGigStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const fetchedGigs = await myGigs();
      setGigs(fetchedGigs);
    };
    fetch();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Available Gigs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gigs.map((gig) => (
          <div
            key={gig._id}
            className="border rounded-xl p-5 hover:shadow-md transition cursor-pointer"
            onClick={() => navigate(`/gig-bids/${gig._id}`)}
          >
            <h3 className="font-semibold text-lg">{gig.title}</h3>
            <p className="text-gray-500 mt-2 line-clamp-2">{gig.desc}</p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-blue-600 font-semibold">₹{gig.budget}</span>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  gig.status === "open"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {gig.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gigs;
