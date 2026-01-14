import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useGigStore from "../store/useGigStore";
import Loading from "../components/Loading";
import { toast } from "react-hot-toast";
import useBidStore from "../store/useBidStore";
import useUiStore from "../store/useUiStore";
import Lottie from "lottie-react";
import celebrate from "../assets/animations/celebrate.json";

const Gig = () => {
  const { id } = useParams();
  const [showAnimation, setShowAnimation] = useState(false);
  const [bid, setBid] = useState("");
  const [gig, setGig] = useState({});
  const [price, setPrice] = useState("");
  const { getGig, loadingGig } = useGigStore();
  const { addBid } = useBidStore();
  const { bidsMade, setBidsMade } = useUiStore();

  useEffect(() => {
    const fetch = async () => {
      const temp = await getGig(id);
      setGig(temp);
    };
    fetch();
  }, [id]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!bid || !price) {
        toast.error("All fields are required");
        return;
      }
      await addBid({
        gig: id,
        message: bid,
        price,
      });
      setBidsMade(bidsMade + 1);
      setPrice("");
      setBid("");
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  if (loadingGig) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 px-6">
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-xl p-8">
        <h1 className="text-3xl font-bold text-slate-900">{gig.title}</h1>
        <p className="mt-2 text-slate-500">Posted by {gig.owner?.name}</p>

        <div className="mt-6">
          <p className="text-slate-700 leading-relaxed">{gig.desc}</p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-2xl font-semibold text-blue-600">
            ₹{gig.budget}
          </span>
          <span className="px-4 py-1 rounded-full text-sm bg-green-100 text-green-700">
            {gig.status}
          </span>
        </div>

        <div className="my-8 border-t border-slate-200"></div>

        <h2 className="text-xl font-semibold text-slate-900">Submit a Bid</h2>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <textarea
            placeholder="Write a short message to the client..."
            value={bid}
            onChange={(e) => setBid(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-3 h-28 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="number"
            placeholder="Your price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
            typt="submit"
          >
            Submit Bid
          </button>
        </form>
      </div>
      {showAnimation && (
        <>
          <Lottie
            animationData={celebrate}
            className="fixed top-[50%] -translate-y-[50%] left-0 -translate-x-[50%] scale-125"
          />
          <Lottie
            animationData={celebrate}
            className="fixed top-[50%] -translate-y-[50%] right-0 translate-x-[50%] scale-125"
          />
        </>
      )}
    </div>
  );
};

export default Gig;
