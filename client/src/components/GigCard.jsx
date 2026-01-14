import React from "react";
import { useNavigate } from "react-router-dom";

const GigCard = ({ gig, idx }) => {
  const navigate = useNavigate();
  return (
    <div
      key={gig?._id || idx}
      onClick={() => navigate(`/gigs/${gig?._id}`)}
      className="bg-white border border-slate-200 cursor-pointer rounded-xl p-5 hover:shadow-md transition"
    >
      <h3 className="font-semibold text-slate-900">{gig?.title}</h3>
      <p className="text-sm text-slate-500 mt-1">
        {gig?.desc.slice(0, 80)} {gig.desc.length > 80 ? "..." : ""}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-blue-600 font-semibold">₹{gig?.budget}</span>

        <butotn
          onClick={() => navigate(`/gigs/${gig?._id}`)}
          className="text-sm text-blue-600 hover:underline"
        >
          View →
        </butotn>
      </div>
    </div>
  );
};

export default GigCard;
