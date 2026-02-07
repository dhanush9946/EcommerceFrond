import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role restriction
  if (roles) {
    const role = user.role?.toLowerCase();
    const allowedRoles = roles.map(r => r.toLowerCase());

    if (!allowedRoles.includes(role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;






// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, roles }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   // If no user → block only if roles required
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Role restriction
//   if (roles && !roles.includes(user.role)) {
//     if (user.role === "Admin") {
//       return <Navigate to="/admin/dashboard" replace />;
//     }
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;



// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, roles }) => {
//   const token = localStorage.getItem("accessToken");
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!token || !user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (roles && !roles.includes(user.role)) {
//     return user.role === "Admin"
//       ? <Navigate to="/admin/dashboard" replace />
//       : <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
