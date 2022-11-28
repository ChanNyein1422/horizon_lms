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

export default function CategoriesView() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5001/api/course_categories")
      .then((res) => res.json())
      .then((body) => {
        setCategories(body.data);
      });
  }, []);
  const count = categories.length;

  function deleteCategories(id) {
    fetch(`http://localhost:5001/api/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Category Deleted Successfully.");
      })
      .then(() => window.location.reload());
  }

  function goToRegister() {
    navigate("/category_create");
  }

  function goToUpdate() {
    navigate("/category_view");
  }
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Toolbar>
            <Typography type="title" color="inherit" style={{ flex: 1 }}>
              Total Categories : {count}
            </Typography>

            <Button variant="outlined" onClick={goToRegister}>
              + Add New
            </Button>
          </Toolbar>
          <Table size="large">
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell>Total Courses</TableCell>

                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.category}</TableCell>
                  <TableCell>{category.courseCount}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => deleteCategories(category._id)}
                    >
                      Delete
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
