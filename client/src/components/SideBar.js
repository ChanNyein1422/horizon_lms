import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function MainListItems() {
  const role = localStorage.getItem("ROLE");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  if (role === "ADMIN") {
    return (
      <React.Fragment>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Link>

        <Link to="/user_view" style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="User Accounts" />
          </ListItemButton>
        </Link>
        <Link to="/course_view" style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Courses" />
          </ListItemButton>
        </Link>
        <Link to="/category_view" style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItemButton>
        </Link>
        <Link to="/assignment_view" style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Assignments" />
          </ListItemButton>
        </Link>

        <Link
          to={`/update_user/${localStorage.getItem("ID")}`}
          style={{ textDecoration: "none" }}
        >
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Update Profile" />
          </ListItemButton>
        </Link>
        <ListItemButton onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItemButton>
      </React.Fragment>
    );
  }

  // Lecturer
  if (role === "LECTURER") {
    return (
      <React.Fragment>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Link>

        <Link to="/course_view" style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Your Courses" />
          </ListItemButton>
        </Link>
        <Link to="/assignments" style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Assignments" />
          </ListItemButton>
        </Link>
        <Link to="/student_progress" style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Students' Progess" />
          </ListItemButton>
        </Link>
        <Link to="/update_user/:id" style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Update Profile" />
          </ListItemButton>
        </Link>
        <ListItemButton onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItemButton>
      </React.Fragment>
    );
  }

  if (role === "STUDENT") {
    return (
      <React.Fragment>
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Link>

        <Link to="/courses" style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Your Courses" />
          </ListItemButton>
        </Link>
        <Link to="/enrol_courses" style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Join Courses" />
          </ListItemButton>
        </Link>
        <Link to="/self_progress" style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Your Progess" />
          </ListItemButton>
        </Link>
        <Link to="/grades" style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Grades" />
          </ListItemButton>
        </Link>
        <Link to="/update_user/:id" style={{ textDecoration: "none" }}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Update Profile" />
          </ListItemButton>
        </Link>
        <ListItemButton onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItemButton>
      </React.Fragment>
    );
  }
}
