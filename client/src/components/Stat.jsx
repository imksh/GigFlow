import React from "react";

const Stat = ({ label, value }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-4 text-center hover:bg-blue-500 hover:text-white text-slate-900">
    <p className="text-2xl font-bold ">{value}</p>
    <p className="text-sm text-slate-500">{label}</p>
  </div>
);

export default Stat;
