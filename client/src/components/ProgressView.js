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

export default function StudentListView() {
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

  function deleteUser(id) {
    fetch(`http://localhost:5001/api/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("User Deleted Successfully.");
      })
      .then(() => window.location.reload());
  }

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Toolbar>
            <Typography type="title" color="inherit" style={{ flex: 1 }}>
              Students Total of : {count}
            </Typography>
          </Toolbar>
          <Table size="large">
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>E-mail</TableCell>

                <TableCell>Date of Birth</TableCell>
                <TableCell>Taken Course</TableCell>
                <TableCell>Progress (Percentage)</TableCell>
              </TableRow>
            </TableHead>
            {/* <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.date_of_birth}</TableCell>
                  <TableCell>{user.branch}</TableCell>
                  <TableCell>{user.user_type}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </Button>

                    <Button
                      size="small"
                      variant="outlined"
                      onClick={goToUpdate}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
