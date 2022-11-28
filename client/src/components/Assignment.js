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
import moment from "moment";

export default function AssignmentView() {
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5001/api/assignments")
      .then((res) => res.json())
      .then((body) => {
        setAssignments(body.data);
      });
  }, []);
  const count = assignments.length;

  function deleteAssignment(id) {
    fetch(`http://localhost:5001/api/assignments/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Assignment Deleted Successfully.");
      })
      .then(() => window.location.reload());
  }
  function goToAssignmentDetail() {
    navigate("/assignment_detail");
  }

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Toolbar>
            <Typography type="title" color="inherit" style={{ flex: 1 }}>
              Assignments of:{count}
            </Typography>
          </Toolbar>
          <Table size="large">
            <TableHead>
              <TableRow>
                <TableCell>Assignment Title</TableCell>
                <TableCell>Description</TableCell>

                <TableCell>Deadline</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map((assignment) => (
                <TableRow key={assignment._id}>
                  <TableCell>{assignment.assignment_name}</TableCell>
                  <TableCell>{assignment.assignment_description}</TableCell>
                  <TableCell>
                    {moment(assignment.deadline).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </TableCell>
                  <TableCell>{assignment.course}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => deleteAssignment(assignment._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      color="info"
                      size="small"
                      onClick={goToAssignmentDetail}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}
