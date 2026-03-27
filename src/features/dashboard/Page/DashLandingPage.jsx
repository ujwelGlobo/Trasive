import StatCard from "@/features/dashboard/components/StatCard.jsx";
import "./dashLandingPage.css";
import { useState, useEffect } from "react";
import {
  Calendar,
  BarChart3,
  Send,
  CheckCircle,
  ThumbsUp,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Car,
  Users,
  Bus,
  Pin,
} from "lucide-react";

const API_URL = "http://192.168.1.74:8000/api/all-counts";

const DashLandingPage = () => {
  const [counts, setCounts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const data = await response.json();
        setCounts(data);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  // Helper: show skeleton value while loading
  const val = (key) => {
    if (loading) return "...";
    if (error) return "—";
    return counts?.[key] ?? 0;
  };

  return (
    <div className="dashboard-page">
      {/* HERO / HEADER */}
      <div className="dashboard-hero">
        <div className="dashboard-container">
          <h2>Query Status</h2>
          <p>Track queries, confirmations, guests and operations</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="dashboard-container">

        {/* Error Banner */}
        {error && (
          <div
            className="alert alert-danger d-flex align-items-center mb-3"
            role="alert"
          >
            <XCircle size={18} className="me-2" />
            <span>Could not load stats: {error}</span>
            <button
              className="btn btn-sm btn-outline-danger ms-auto"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {/* KPI SECTION */}
        <div className="dashboard-kpi">
          <div className="row g-3">
            <div className="col-12 col-sm-6 col-lg-2">
              <StatCard
                icon={<Calendar />}
                value={val("todays_queries")}
                label="Today's Queries"
                variant="red"
                loading={loading}
              />
            </div>

            <div className="col-12 col-sm-6 col-lg-2">
              <StatCard
                icon={<BarChart3 />}
                value={val("total_queries")}
                label="Total Queries"
                variant="blue"
                loading={loading}
              />
            </div>

            <div className="col-12 col-sm-6 col-lg-2">
              <StatCard
                icon={<Send />}
                value={val("proposal_sent")}
                label="Proposal Sent"
                variant="orange"
                loading={loading}
              />
            </div>

            <div className="col-12 col-sm-6 col-lg-2">
              <StatCard
                icon={<CheckCircle />}
                value={val("total_pro_confirmed")}
                label="Confirmed"
                variant="green"
                loading={loading}
              />
            </div>

            <div className="col-12 col-sm-6 col-lg-2">
              <StatCard
                icon={<ThumbsUp />}
                value={val("total_confirmed")}
                label="Total Confirmed"
                variant="purple"
                loading={loading}
              />
            </div>

            <div className="col-12 col-sm-6 col-lg-2">
              <StatCard
                icon={<XCircle />}
                value={val("total_lost")}
                label="Total Lost"
                variant="red"
                loading={loading}
              />
            </div>
          </div>
        </div>

        {/* OPERATIONS */}
        <div className="dashboard-section">
          <h5 className="section-title">Operations</h5>

          <div className="row g-4">
            <div className="col-12 col-md-4">
              <StatCard icon={<ArrowRight />} to="/operations/arrivals-today" value="0" label="Arrivals For Today" type="operation" />
            </div>

            <div className="col-12 col-md-4">
              <StatCard icon={<Car />} to="/operations/ongoing-guests" value="0" label="On Going Guest" type="operation" />
            </div>

            <div className="col-12 col-md-4">
              <StatCard icon={<ArrowLeft />} to="/operations/departures-today" value="0" label="Departure For Today" type="operation" />
            </div>

            <div className="col-12 col-md-4">
              <StatCard icon={<ArrowRight />} to="/operations/Week-Arrivals" value="0" label="This Week Arrival" type="operation" />
            </div>

            <div className="col-12 col-md-4">
              <StatCard icon={<Car />} to="/operations/supplier-payment" value="0" label="Suppliers Payment" type="operation" />
            </div>

            <div className="col-12 col-md-4">
              <StatCard icon={<ArrowLeft />} to="/operations/today-payment-collection" value="0" label="Today's Payment Collection" type="operation" />
            </div>

            <div className="col-12 col-md-4">
              <StatCard icon={<Pin />} to="/operations/follow-up" value="0" label="Task / Follow Up" type="operation" />
            </div>

            <div className="col-12 col-md-4">
              <StatCard icon={<ArrowRight />} to="/operations/guest-movement" value="0" label="Guest Movement" type="operation" />
            </div>

            <div className="col-12 col-md-4">
              <StatCard icon={<Users />} to="/operations/Sales" value="0" label="Sales Rep / Online Users" type="operation" />
            </div>

            <div className="col-12 col-md-4">
              <StatCard icon={<Bus />} to="/operations/Transportation" value="0" label="Transportation Schedule" type="operation" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashLandingPage;


// import StatCard from "@/features/dashboard/components/StatCard.jsx";
// import "./dashLandingPage.css";
// // import CardSkeleton from "../../../components/skeletons/CardSkeletons";
// // import TableSkeleton from "../../../components/skeletons/TableSkeletons";
// import { useState,useEffect } from "react";
// import {
//   Calendar,
//   BarChart3,
//   Send,
//   CheckCircle,
//   ThumbsUp,
//   XCircle,
//   ArrowRight,
//   ArrowLeft,
//   Car,
//   Users,
//   Bus,
//   Pin
// } from "lucide-react";


// const DashLandingPage = () => {
// const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // simulate API delay
//     setTimeout(() => {
//       setLoading(false);
//     }, 1200);
//   }, []);


//   return (
//     <div className="dashboard-page">

//         {/* <div className="row g-3">
//         {[...Array(6)].map((_, i) => (
//           <div key={i} className="col-12 col-sm-6 col-lg-2">
//             {loading ? (
//               <CardSkeleton />
//             ) : (
//               <StatCard
//                 icon="📅"
//                 value="0"
//                 label="Today's Queries"
//               />
//             )}
//           </div>
//         ))}
//       </div> */}

//       {/* HERO / HEADER */}
//       <div className="dashboard-hero">
//         <div className="dashboard-container">
//           <h2>Query Status</h2>
//           <p>Track queries, confirmations, guests and operations</p>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="dashboard-container">

//         {/* KPI SECTION */}
//        <div className="dashboard-kpi">
//   <div className="row g-3">
//     <div className="col-12 col-sm-6 col-lg-2">
      
//       <StatCard
//         icon={<Calendar />}
//         value="0"
//         label="Today's Queries"
//         variant="red"
       
//       />
//     </div>

//     <div className="col-12 col-sm-6 col-lg-2">
//       <StatCard
//         icon={<BarChart3 />}
//         value="88"
//         label="Total Queries"
//         variant="blue"
        
//       />
//     </div>

//     <div className="col-12 col-sm-6 col-lg-2">
//       <StatCard
//         icon={<Send />}
//         value="0"
//         label="Proposal Sent"
//         variant="orange"
//       />
//     </div>

//     <div className="col-12 col-sm-6 col-lg-2">
//       <StatCard
//         icon={<CheckCircle />}
//         value="4"
//         label="Confirmed"
//         variant="green"
//       />
//     </div>

//     <div className="col-12 col-sm-6 col-lg-2">
//       <StatCard
//         icon={<ThumbsUp />}
//         value="10"
//         label="Total Confirmed"
//         variant="purple"
//       />
//     </div>

//     <div className="col-12 col-sm-6 col-lg-2">
//       <StatCard
//         icon={<XCircle />}
//         value="5"
//         label="Total Lost"
//         variant="red"
//       />
//     </div>
//   </div>
// </div>

//         {/* OPERATIONS */}
    
// <div className="dashboard-section">
//   <h5 className="section-title">Operations</h5>

//   <div className="row g-4">
//     <div className="col-12 col-md-4">
//       <StatCard icon={<ArrowRight />}  to="/operations/arrivals-today" value="0" label="Arrivals For Today" type="operation" />
//     </div>

//     <div className="col-12 col-md-4">
//       <StatCard icon={<Car />} to="/operations/ongoing-guests" value="0" label="On Going Guest" type="operation" />
//     </div>

//     <div className="col-12 col-md-4">
//       <StatCard icon={<ArrowLeft />} to="/operations/departures-today" value="0" label="Departure For Today" type="operation" />
//     </div>

//     <div className="col-12 col-md-4">
//       <StatCard icon={<ArrowRight />} to="/operations/Week-Arrivals" value="0" label="This Week Arrival" type="operation" />
//     </div>

//     <div className="col-12 col-md-4">
//       <StatCard icon={<Car />} to="/operations/supplier-payment" value="0" label="Suppliers Payment" type="operation" />
//     </div>

//     <div className="col-12 col-md-4">
//       <StatCard icon={<ArrowLeft />} to="/operations/today-payment-collection" value="0" label="Today's Payment Collection" type="operation" />
//     </div>

//     <div className="col-12 col-md-4">
//       <StatCard icon={<Pin />} to="/operations/follow-up" value="0" label="Task / Follow Up" type="operation" />
//     </div>

//     <div className="col-12 col-md-4">
//       <StatCard icon={<ArrowRight />} to="/operations/guest-movement" value="0" label="Guest Movement" type="operation" />
//     </div>

//     <div className="col-12 col-md-4">
//       <StatCard icon={<Users />} to="/operations/Sales" value="0" label="Sales Rep / Online Users" type="operation" />
//     </div>

//     <div className="col-12 col-md-4">
//       <StatCard icon={<Bus />} to="/operations/Transportation" value="0" label="Transportation Schedule" type="operation" />
//     </div>
//   </div>
// </div>


//       </div>
//     </div>
//   );
// };

// export default DashLandingPage;

