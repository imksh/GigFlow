import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import useGigStore from "../store/useGigStore";
import GigCard from "./GigCard";
import { useNavigate } from "react-router-dom";

const HeaderSearch = () => {
  const [search, setSearch] = useState("");
  const { searchGigs } = useGigStore();
  const [gigs, setGigs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!search.trim()) {
        setGigs([]);
        return;
      }
      const res = await searchGigs(search);
      setGigs(res);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="flex flex-col relative">
      <div className="w-[80%] mx-auto flex items-center justify-center relative">
        <CiSearch size={20} className="absolute left-2.5" />
        <input
          type="text"
          placeholder="Search jobs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full mx-auto  border border-slate-300  focus:outline-none focus:ring-2 focus:ring-blue-500  rounded-3xl pr-2 pl-8 py-2 `}
        />
      </div>
      {gigs.length > 0 && (
        <div className="absolute top-14 w-full flex flex-col bg-(--primary) p-4 rounded-b-2xl items-baseline gap-3">
          {gigs.map((gig, idx) => (
            <button
              onClick={() => {
                navigate(`/gigs/${gig?._id}`);
                setGigs([]);
                setSearch("");
              }}
              key={idx}
            >
              {gig.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
