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

export default function SignUp() {
  const [role, setRole] = React.useState("");
  const [branch, setBranch] = React.useState("");
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!role || !branch) {
      console.log("Data inputs cannot be empty");
      return;
    }
    const data = new FormData(event.currentTarget);
    const reqBody = {
      email: data.get("email"),
      password: data.get("password"),
      username: data.get("userName"),
      date_of_birth: data.get("dateOfBirth"),
      branch: branch,
      user_type: role,
    };

    fetch("http://localhost:5001/api/users/", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Created Successfully");
        navigate("/user_view");
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
          <Typography component="h1" variant="h5">
            Create New Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Date of Birth:</Typography>
                <TextField
                  required
                  fullWidth
                  id="dateOfBirth"
                  type="date"
                  name="dateOfBirth"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    User Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    required
                    label="User Role"
                    onChange={handleRoleChange}
                  >
                    <MenuItem value={"ADMIN"}>Admin</MenuItem>
                    <MenuItem value={"LECTURER"}>Lecturer</MenuItem>
                    <MenuItem value={"STUDENT"}>Student</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Select Branch
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={branch}
                    required
                    label="User Role"
                    onChange={handleBranchChange}
                  >
                    <MenuItem value={"YANGON-1"}>Yangon-1</MenuItem>
                    <MenuItem value={"YANGON-2"}>Yangon-2</MenuItem>
                    <MenuItem value={"MANDALAY"}>Mandalay</MenuItem>
                    <MenuItem value={"NAYPYIDAW"}>NayPyiDaw</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
