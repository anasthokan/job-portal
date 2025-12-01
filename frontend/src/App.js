import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import JobsList from "./pages/JobsList";
import JobDetails from "./pages/JobDetails";
import PostJob from "./pages/PostJob";
import MyApplications from "./pages/MyApplications";
import Applicants from "./pages/Applicants";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Dashboard from "./pages/Dashboard";
import EmployerJobs from "./pages/EmployerJobs";


import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminJobs from "./pages/admin/AdminJobs";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* Public Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* Protected Pages */}
        <Route path="/jobs" element={
          <ProtectedRoute>
            <JobsList />
          </ProtectedRoute>
        } />

        
        <Route path="/my-jobs" element={
          <ProtectedRoute role="employer">
            <EmployerJobs />
          </ProtectedRoute>
        } />


        <Route path="/job/:id" element={
          <ProtectedRoute>
            <JobDetails />
          </ProtectedRoute>
        } />

        {/* Employer Only */}
        <Route path="/post-job" element={
          <ProtectedRoute role="employer">
            <PostJob />
          </ProtectedRoute>
        } />

        <Route path="/applicants/:jobId" element={
          <ProtectedRoute role="employer">
            <Applicants />
          </ProtectedRoute>
        } />

        {/* Jobseeker Only */}
        <Route path="/my-applications" element={
          <ProtectedRoute role="jobseeker">
            <MyApplications />
          </ProtectedRoute>
        } />

        {/* Profile */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/edit-profile" element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        } />

        {/* Admin */}
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/users" element={
          <ProtectedRoute role="admin">
            <AdminUsers />
          </ProtectedRoute>
        } />

        <Route path="/admin/jobs" element={
          <ProtectedRoute role="admin">
            <AdminJobs />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
