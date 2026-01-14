import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBidStore from "../store/useBidStore";
import Footer from "../components/Footer";

const Bids = () => {
  const [bids, setBids] = useState([]);
  const navigate = useNavigate();
  const { myBids } = useBidStore();

  useEffect(() => {
    const fetch = async () => {
      const res = await myBids();
      setBids(res);
    };
    fetch();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">My Bids</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bids.map((bid) => (
          <div
            key={bid._id}
            className="border rounded-xl p-5 hover:shadow-md transition cursor-pointer"
            onClick={() => navigate(`/gigs/${bid.gig._id}`)}
          >
            {/* Gig info */}
            <h3 className="font-semibold text-lg">{bid.gig.title}</h3>
            <p className="text-gray-500 mt-2 line-clamp-2">{bid.gig.desc}</p>

            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-blue-600 font-semibold">
                  Your Bid: ₹{bid.price}
                </p>
                <p className="text-gray-500 text-sm">
                  Gig Budget: ₹{bid.gig.budget}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  bid.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : bid.status === "hired"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {bid.status}
              </span>
            </div>
          </div>
        ))}
        {bids.length === 0 && (
          <div className="grow justify-center items-center flex w-full h-full">
            No Bids Available
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Bids;
