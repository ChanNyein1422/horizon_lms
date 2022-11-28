import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const theme = createTheme();

export default function MaterialAdd() {
  const params = useParams();
  const navigate = useNavigate();
  function goBack() {
    navigate("/course_details/" + params.id);
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    // if (!data.get("title") || !data.get("description")) {
    //   alert("Fill in the inputs");
    //   return;
    // }
    const reqBody = {
      material_title: data.get("title"),
      material_description: data.get("description"),
      course: params.id,
    };

    fetch("http://localhost:5001/api/materials/", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Added Successfully");
        navigate("/course_details/" + params.id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h4" variant="h5">
            + Add New Lecture File
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="cancel"
                  fullWidth
                  color="inherit"
                  variant="contained"
                  onClick={goBack}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
