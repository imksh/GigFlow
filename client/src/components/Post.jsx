import React from "react";
import { useEffect, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import useAuthStore from "../store/useAuthStore";
import useGigStore from "../store/useGigStore";
import { toast } from "react-hot-toast";
import Lottie from "lottie-react";
import celebrate from "../assets/animations/celebrate.json";
import useUiStore from "../store/useUiStore";

const Post = () => {
  const [showPost, setShowPost] = useState(false);
  const { user } = useAuthStore();
  const { post } = useGigStore();
  const { gigsPosted, setGigsPosted } = useUiStore();
  const [showAnimation, setShowAnimation] = useState(false);
  const [input, setInput] = useState({
    title: "",
    desc: "",
    budget: "",
  });

  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
    return `${parts[0][0]} ${parts[1][0]}`.toUpperCase();
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!input.title || !input.desc || !input.budget) {
      toast.error("All fields are required");
      return;
    }
    const res = await post(input);
    if (res) {
      setGigsPosted(gigsPosted + 1);
      setInput({
        title: "",
        desc: "",
        budget: "",
      });
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
      }, 3000);
    }
  };
  return (
    <div
      className={`border border-slate-300 rounded-lg w-full h-fit grid sm:grid-cols-[20%_80%] min-h-20 mb-8`}
    >
      {!showPost ? (
        <button
          className={`m-auto text-2xl font-bold rounded-lg text-white mx-auto col-span-2 flex items-center justify-center gap-5 w-full h-full cursor-pointer hover:scale-102 duration-150  ${
            showPost ? "bg-white" : " bg-blue-500 "
          }`}
          onClick={() => {
            setShowPost((p) => !p);
          }}
        >
          <p className="">Post a Gig</p>
          <IoCreateOutline />
        </button>
      ) : (
        <>
          <p className="text-2xl font-bold text-blue-500 mx-auto col-span-2 mt-4 text-center">
            Post a Gig
          </p>
          <div className="hidden sm:block text-white bg-blue-400 rounded-full p-4 w-fit h-fit mx-auto my-8 font-extrabold min-w-14 aspect-square text-center">
            {getInitials(user?.name)}
          </div>
          <form
            className="flex flex-col p-4 gap-4 w-full col-span-2 sm:col-span-1"
            onSubmit={(e) => handlePost(e)}
          >
            <input
              type="text"
              name="title"
              id="title"
              className="w-full border border-slate-300 rounded-lg p-2"
              placeholder="Title"
              value={input.title}
              onChange={(e) => setInput({ ...input, title: e.target.value })}
            />

            <textarea
              name="desc"
              id="desc"
              placeholder="Description"
              className="w-full border border-slate-300 rounded-lg p-2"
              value={input.desc}
              onChange={(e) => setInput({ ...input, desc: e.target.value })}
            ></textarea>

            <input
              type="number"
              name="budget"
              id="budget"
              placeholder="Budget"
              className="w-full border border-slate-300 rounded-lg p-2"
              value={input.budget}
              onChange={(e) => setInput({ ...input, budget: e.target.value })}
            />
            <div className="flex justify-between">
              <button
                className="px-6 py-3 bg-red-500 text-white hover:bg-red-700 rounded-xl w-fit m-2 mr-auto cursor-pointer "
                onClick={(e) => {
                  e.preventDefault();
                  setShowPost(false);
                }}
                type="button"
              >
                Cancle
              </button>
              <button
                className="px-6 py-3 bg-blue-500 text-white hover:bg-blue-700 rounded-xl w-fit m-2 ml-auto cursor-pointer"
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        </>
      )}

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

export default Post;
