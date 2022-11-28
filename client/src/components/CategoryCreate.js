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
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function CategoryCreate() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    fetch("http://localhost:5001/api/course_categories/", {
      method: "POST",
      body: JSON.stringify({ category: data.get("name") }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Category Created Successfully");
        navigate("/category_view");
      })
      .catch((err) => console.log(err));
  };
  function goBack() {
    navigate("/category_view");
  }

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
          <Typography component="h1" variant="h5">
            Create New Category
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Category Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Create
                </Button>
                <Button
                  type="cancel"
                  fullWidth
                  variant="inherit"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={goBack}
                >
                  Cancel
                </Button>{" "}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
