import { create } from "zustand";
import api from "../utils/axios";
import { toast } from "react-hot-toast";

const useBidStore = create((set, get) => ({
  loadingGig: false,
  addBid: async (data) => {
    try {
      const res = await api.post("/bids/add", data);
      toast.success("Bid Added");
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("Error in addBid: ", error);
    }
  },

  getBids: async (id) => {
    try {
      set({ loadingGig: true });
      const res = await api.get(`/bids/${id}`);
      return res.data;
    } catch (error) {
      console.log("Error in getGig: ", error);
    } finally {
      set({ loadingGig: false });
    }
  },

  myBids: async () => {
    try {
      set({ loadingGig: true });
      const res = await api.get(`/bids/my-bids`);
      return res.data;
    } catch (error) {
      console.log("Error in myGig: ", error);
    } finally {
      set({ loadingGig: false });
    }
  },

  hire: async (id) => {
    try {
      const res = await api.patch(`/bids/${id}`);
      toast.success("Hired Successfully");
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Hiring failed");
      console.log("Error in hire: ", error);
    }
  },
}));

export default useBidStore;
