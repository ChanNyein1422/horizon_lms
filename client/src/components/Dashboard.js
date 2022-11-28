import React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Calendar from "react-calendar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { navigate, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  function preventDefault(event) {
    event.preventDefault();
  }
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/courses")
      .then((res) => res.json())
      .then((body) => setCourses(body.data));
  }, []);
  function goToCourses() {
    navigate("/course_view");
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Calendar />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <React.Fragment>
            Total Courses
            <Typography component="p" variant="h4">
              45
            </Typography>
            <LocalLibraryIcon />
          </React.Fragment>
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          Courses Available to Enroll
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Corse Code</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Lecturer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell>{course.course_code}</TableCell>
                  <TableCell>{course.course_name}</TableCell>
                  <TableCell>{course.course_description}</TableCell>
                  <TableCell>{course.end_date}</TableCell>
                  <TableCell>{course.lecturer?.username}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={goToCourses}>
            <Link style={{ textDecoration: "none" }} sx={{ mt: 3 }}>
              See more
            </Link>
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
