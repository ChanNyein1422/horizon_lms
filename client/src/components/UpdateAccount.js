import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import { useParams } from "react-router-dom";

const theme = createTheme();

export default function UpdateUser() {
  const [role, setRole] = React.useState("");
  const [branch, setBranch] = React.useState("");
  const [data, setData] = React.useState({});
  const params = useParams();

  useEffect(() => {
    fetch("http://localhost:5001/api/users/" + params.id)
      .then((res) => {
        return res.json();
      })
      .then((body) => {
        console.log(body);
        setData(body);
      });
  }, [params.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateData = new FormData(event.currentTarget);

    const reqBody = {
      email: updateData.get("email"),
      username: updateData.get("userName"),
      date_of_birth: updateData.get("dateOfBirth"),
    };
    fetch(`http://localhost:5001/api/users/${data._id}`, {
      method: "PATCH",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Updated Successfully");
        window.location.reload();
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
            Update User Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {data.username ? (
                  <TextField
                    name="userName"
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    defaultValue={data.username}
                    autoFocus
                  ></TextField>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography>Date of Birth:</Typography>
                <TextField
                  required
                  fullWidth
                  id="dateOfBirth"
                  type="date"
                  name="dateOfBirth"
                  defaultValue={data.date_of_birth}
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
                >
                  {data.email}
                </TextField>
              </Grid>
            </Grid>
            <Grid>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Update
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
