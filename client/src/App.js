import React from "react";
import LogIn from "./components/LogIn";
import { Route, Routes } from "react-router-dom";
import "@fontsource/roboto/300.css";
import Wrapper from "./components/DashboardWrapper";
import Dashboard from "./components/Dashboard";
import UserAccounts from "./components/Admin/UserAccounts";
import SignUp from "./components/Admin/SignUp";
import UpdateUser from "./components/UpdateAccount";
import Courses from "./components/Courses";
import AssignmentView from "./components/Assignment";
import CourseDetails from "./components/CourseDetails";
import MaterialAdd from "./components/MaterialAdd";
import AssignmentDetails from "./components/AssignmentDetails";
import CategoriesView from "./components/Categories";
import CategoryCreate from "./components/CategoryCreate";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user_view" element={<UserAccounts />} />
          <Route path="user_register" element={<SignUp />} />
          <Route path="update_user/:id" element={<UpdateUser />} />
          <Route path="course_view" element={<Courses />} />
          <Route path="course_view" element={<Courses />} />
          <Route path="course_details/:id" element={<CourseDetails />} />
          <Route path="assignment_view" element={<AssignmentView />} />
          <Route path="material_add/:id" element={<MaterialAdd />} />
          <Route path="category_view" element={<CategoriesView />} />
          <Route path="category_create" element={<CategoryCreate />} />
          <Route path="assignment_detail" element={<AssignmentDetails />} />
        </Route>
        <Route path="login" element={<LogIn />} />
      </Routes>
    </div>
  );
}

export default App;
