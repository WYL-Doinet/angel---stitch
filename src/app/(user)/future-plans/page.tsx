'use client'

import { ArrowLeft, Plus } from "lucide-react";

const Page = () => {
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
    <div className="bg-gradient-to-r from-green-400 to-blue-400 p-4 flex items-center justify-between sticky top-0 z-10 shadow-md">
      <div className="flex items-center space-x-4">
        <button className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-white">Future Plans</h1>
      </div>
      <button className="bg-white/20 text-white rounded-full p-2 hover:bg-white/30 transition-colors">
        <Plus className="w-6 h-6" />
      </button>
    </div>
    {/* <div className="p-4 space-y-4">
            {plans.length > 0 ? plans.map(plan => (
                <div key={plan.id} className="bg-white rounded-2xl p-4 shadow-lg border-l-4 border-green-400">
                    <h3 className="font-bold text-gray-800 text-lg mb-1">{plan.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm space-x-4 mb-2">
                        <span>📅 {new Date(plan.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span>⏰ {plan.time}</span>
                    </div>
                     {plan.location && <p className="text-sm text-gray-500">📍 {plan.location}</p>}
                </div>
            )) : (<div className="text-center py-20 bg-white rounded-2xl shadow-lg"><p className="text-gray-500">No future plans scheduled yet.</p><button onClick={() => setShowAddPlanModal(true)} className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all">Plan a Date</button></div>)}
        </div> */}
    {/* {showAddPlanModal && <AddPlanModal/>} */}
  </div>;
};

export default Page;
