import { create } from "zustand";
import api from "../utils/axios";
import { toast } from "react-hot-toast";

const useGigStore = create((set, get) => ({
  gigs: [],
  loadingGig: false,
  searching: false,
  post: async (data) => {
    try {
      const res = await api.post("/gigs", data);
      toast.success("Gig Posted");
      const gigs = get().gigs;
      const updated = [res.data, ...gigs];
      set({ gigs: updated });
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Error in post: ", error);
    }
  },
  getAll: async () => {
    try {
      const res = await api.get("/gigs");
      set({ gigs: res.data });
      // toast.success(res.data.message);
      return res.data;
    } catch (error) {
      console.log("Error in getAll: ", error);
    }
  },

  getGig: async (id) => {
    try {
      set({ loadingGig: true });
      const res = await api.get(`/gigs/${id}`);
      return res.data;
    } catch (error) {
      console.log("Error in getGig: ", error);
    } finally {
      set({ loadingGig: false });
    }
  },

  myGigs: async () => {
    try {
      set({ loadingGig: true });
      const res = await api.get(`/gigs/my-gigs`);
      return res.data;
    } catch (error) {
      console.log("Error in myGig: ", error);
    } finally {
      set({ loadingGig: false });
    }
  },

  searchGigs: async (search, min, max) => {
    try {
      set({ searching: true });

      const params = {};
      if (search) params.search = search;
      if (min) params.min = min;
      if (max) params.max = max;

      const res = await api.get("/gigs", { params });
      return res.data;
    } catch (error) {
      console.log("Error in searchGigs:", error);
    } finally {
      set({ searching: false });
    }
  },
}));

export default useGigStore;
