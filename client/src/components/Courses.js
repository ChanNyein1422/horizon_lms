import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5001/api/courses")
      .then((res) => res.json())
      .then((body) => setCourses(body.data));
  }, []);
  // function goToCourseDetails(id) {
  //   navigate("/course_details");
  // }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            View All Courses
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {courses.map((course) => (
              <Grid item key={course._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {course.course_name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h3">
                      {course.course_code}
                    </Typography>
                    <Typography>{course.course_description}</Typography>
                    <Typography>End Date: {course.end_date}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        navigate("/course_details/" + course._id);
                      }}
                    >
                      View
                    </Button>
                    <Button size="small">Edit</Button>
                    <Button size="small">Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
