import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios";
import { toast } from "react-hot-toast";
import useBidStore from "../store/useBidStore";
import useGigStore from "../store/useGigStore";
import Loading from "../components/Loading";

const GigBids = () => {
  const { id } = useParams();
  const [bids, setBids] = useState([]);
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getBids, hire } = useBidStore();
  const { getGig } = useGigStore();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const gigRes = await getGig(id);
      const bidsRes = await getBids(id);
      setGig(gigRes);
      setBids(bidsRes);
    } catch (err) {
      toast.error("Failed to load bids");
    } finally {
      setLoading(false);
    }
  };

  const handleHire = async (bidId) => {
    try {
      await hire(bidId);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Hire failed");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-50 pt-12 md:pt-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Gig Info */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8">
          <h1 className="text-2xl font-bold text-slate-900">{gig.title}</h1>
          <p className="text-slate-500 mt-2">{gig.desc}</p>
          <div className="mt-4 flex justify-between">
            <span className="font-semibold text-blue-600">₹{gig.budget}</span>
            <span
              className={`px-3 py-1 rounded text-sm ${
                gig.status === "open"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {gig.status}
            </span>
          </div>
        </div>

        {/* Bids */}
        <h2 className="text-xl font-semibold mb-4">Freelancer Bids</h2>

        <div className="space-y-4">
          {bids.map((bid) => (
            <div
              key={bid._id}
              className="bg-white border border-slate-200 rounded-xl p-5 flex justify-between md:items-center flex-col md:flex-row"
            >
              <div>
                <p className="font-medium text-slate-900">
                  {bid.freelancer?.name}
                </p>
                <p className="text-sm text-slate-500">
                  {bid.freelancer?.email}
                </p>
                <p className="text-sm text-slate-500">{bid.message}</p>
              </div>

              <div className="flex items-center gap-4 justify-between md:justify-baseline my-2 md:my-0">
                <span className="font-semibold text-blue-600">
                  ₹{bid.price}
                </span>

                {gig.status === "open" && (
                  <button
                    onClick={() => handleHire(bid._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700"
                  >
                    Hire
                  </button>
                )}

                {bid.status !== "pending" && (
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      bid.status === "hired"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {bid.status}
                  </span>
                )}
              </div>
            </div>
          ))}

          {bids.length === 0 && (
            <p className="text-slate-500 text-center">No bids yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GigBids;
