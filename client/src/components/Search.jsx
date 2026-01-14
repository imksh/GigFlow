import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import useGigStore from "../store/useGigStore";
import GigCard from "./GigCard";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Search = () => {
  const [search, setSearch] = useState("");
  const { searchGigs, searching } = useGigStore();
  const [loading, setLoading] = useState(false);
  const [gigs, setGigs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(async () => {
      if (!search.trim()) {
        setGigs([]);
        setLoading(false);
        return;
      }

      const res = await searchGigs(search);
      setGigs(res);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="flex flex-col relative w-[80%] mx-auto h-full">
      <div className=" w-full mx-auto flex items-center justify-center relative z-50">
        <CiSearch size={24} className="absolute left-2.5" />
        <input
          type="text"
          placeholder="Search jobs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full mx-auto  border border-slate-300  focus:outline-none focus:ring-2 focus:ring-blue-500  rounded-lg p-4 pl-10 `}
        />
      </div>
      {gigs.length === 0 ? (
        <div className="mt-2 text-sm text-slate-500">
          {loading ? (
            <Loading size="w-16 h-16" bg="inherit" />
          ) : search.length > 0 ? (
            <div className="w-full h-full flex justify-center items-center">No gigs found</div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col py-4 px-1 rounded-b-2xl items-baseline gap-3">
          {gigs.map((gig, idx) => (
            <button
              onClick={() => {
                navigate(`/gigs/${gig?._id}`);
                setGigs([]);
                setSearch("");
              }}
              className="border border-slate-300 hover:shadow-lg cursor-pointer w-full p-2 flex items-baseline rounded-lg flex-col justify-baseline"
              key={idx}
            >
              <p className="">{gig.title}</p>
              <p className="text-slate-500">
                {gig?.desc.slice(0, 80)} {gig.desc.length > 80 ? "..." : ""}
              </p>
              <p className="text-blue-500 ml-auto">₹{gig.budget}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
