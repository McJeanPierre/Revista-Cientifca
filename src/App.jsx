import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './components/UserDashboard';
import ReviewerDashboard from './components/ReviewerDashboard';
import EditorDashboard from './components/EditorDashboard';
import SearchPage from './pages/SearchPage';

const PrivateRoute = ({ children, allowedRoles }) => {
 const { user } = useAuth();
 if (!user) {
   return <Navigate to="/login" />;
 }
 if (allowedRoles && !allowedRoles.includes(user.role)) {
   return <Navigate to="/" />;
 }
 return children;
};

function App() {
 return (
   <AuthProvider>
     <Router>
       <div className="App">
         <Navbar />
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/login" element={<LoginPage />} />
           <Route path="/register" element={<RegisterPage />} />
           <Route path="/search" element={<SearchPage />} />
           <Route 
             path="/user-dashboard" 
             element={
               <PrivateRoute allowedRoles={['user']}>
                 <UserDashboard />
               </PrivateRoute>
             } 
           />
           <Route 
             path="/reviewer-dashboard" 
             element={
               <PrivateRoute allowedRoles={['reviewer']}>
                 <ReviewerDashboard />
               </PrivateRoute>
             } 
           />
           <Route 
             path="/editor-dashboard" 
             element={
               <PrivateRoute allowedRoles={['editor']}>
                 <EditorDashboard />
               </PrivateRoute>
             } 
           />
         </Routes>
       </div>
     </Router>
   </AuthProvider>
 );
}

export default App;

