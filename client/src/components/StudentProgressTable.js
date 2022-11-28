import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, FormControl, Grid, Paper, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, navigate } from "react-router-dom";

export default function StudentProgress() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5001/api/users")
      .then((res) => res.json())
      .then((body) => {
        setUsers(body.data);
      });
  }, []);
  const count = users.length;

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Toolbar>
            <Typography type="title" color="inherit" style={{ flex: 1 }}>
              Total Enrolled Students of : {count}
            </Typography>
          </Toolbar>
          <Table size="large">
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>E-mail</TableCell>

                <TableCell>Date of Birth</TableCell>
                <TableCell>Progress</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
