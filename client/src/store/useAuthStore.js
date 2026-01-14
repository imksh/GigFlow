import { create } from "zustand";
import api from "../utils/axios";
import { toast } from "react-hot-toast";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  isChecking: false,

  register: async (data) => {
    try {
      set({ loading: true });
      const res = await api.post("/auth/register", data);
      toast.success(res.data.message || "Registeration Successful");
      set({ user: res.data, loading: false });
      return true;
    } catch (err) {
      console.log("Error in signup: ", err);
      toast.error(err.response.data.message);
      set({ loading: false });
      return false;
    }
  },

  login: async (data) => {
    try {
      set({ loading: true });
      const res = await api.post("/auth/login", data);
      set({ user: res.data, loading: false });
      toast.success("Login Successfully");
      return true;
    } catch (err) {
      console.log("Error in login: ", err);
      toast.error(err.response.data.message);
      set({ loading: false });
      return false;
    }
  },

  logout: async () => {
    try {
      const res = await api.post("/auth/logout");
      toast.success("Logout Successfully");
      set({ user: null });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  checkAuth: async () => {
    try {
      set({ isChecking: true });
      const res = await api.get("/auth/check");
      set({ user: res.data });
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      set({ isChecking: false });
    }
  },
}));

export default useAuthStore;
