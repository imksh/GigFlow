import useUiStore from "../store/useUiStore";
import useAuthStore from "../store/useAuthStore";
import Footer from "../components/Footer";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Dashboard = () => {
  const { gigsPosted, bidsMade, hired, activeGigs, activeBids } = useUiStore();

  const { user } = useAuthStore();

  const stats = [
    { name: "Gigs", value: gigsPosted },
    { name: "Bids", value: bidsMade },
    { name: "Hired", value: hired },
    { name: "Active Gigs", value: activeGigs },
    { name: "Active Bids", value: activeBids },
  ];

  const earnings = [
    { month: "Jan", amount: 5000 },
    { month: "Feb", amount: 12000 },
    { month: "Mar", amount: 18000 },
  ];

  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
    return `${parts[0][0]} ${parts[1][0]}`.toUpperCase();
  };
  return (
    <div className="p-6 space-y-6 bg-slate-50">
      <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-xl px-4 py-6 md:p-6 flex items-center justify-between">
        <div className="flex items-baseline gap-4 w-full flex-col sm:flex-row">
          <div className="flex gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-600 text-white flex items-center justify-center rounded-full text-xl font-bold min-w-10 aspect-square text-center">
              {getInitials(user?.name)}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{user.name}</p>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
          </div>
          <div className="mt-1 flex gap-2 ml-auto">
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
              Client
            </span>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
              Freelancer
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-5xl my-8 mx-auto">
        {stats.map((s) => (
          <div key={s.name} className="bg-white p-4 rounded-xl shadow">
            <p className="text-gray-500">{s.name}</p>
            <h2 className="text-2xl font-bold">{s.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-4 rounded-xl shadow w-full sm:w-[70%] md:w-[50%] mx-auto">
          <h3 className="mb-4 font-semibold">Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="mb-4 font-semibold">Earnings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={earnings}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="amount" stroke="#16a34a" />
            </LineChart>
          </ResponsiveContainer>
        </div> */}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
