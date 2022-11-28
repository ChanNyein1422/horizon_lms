import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import DownloadIcon from "@mui/icons-material/Download";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const theme = createTheme();

export default function CourseDetails() {
  const params = useParams();
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5001/api/materials?course=${params.id}`)
      .then((res) => res.json())
      .then((body) => {
        console.log(body.data);
        setMaterials(body.data);
      });
  }, [params.id]);
  const navigate = useNavigate();
  function goToAssignments() {
    navigate("/course_details/" + params.id);
  }
  function goToMaterialAdd() {
    navigate("/material_add/" + params.id);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" justify="space-between">
        <Toolbar>
          <Typography variant="h6" color="inherit" style={{ flex: 1 }} noWrap>
            Learning Materials
          </Typography>
          <Button
            variant="contained"
            color="success"
            sx={{ mx: 3 }}
            onClick={goToMaterialAdd}
          >
            + Add New
          </Button>
          <Button variant="contained" color="info" onClick={goToAssignments}>
            Check Assignments
          </Button>
        </Toolbar>
      </AppBar>

      <main>
        <Container sx={{ py: 3 }} maxWidth="md">
          <Grid container spacing={2}>
            {materials.map((material) => (
              <Grid item key={material._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {material.material_title}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h3">
                      {material.material_description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">
                      <DownloadIcon /> Download
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
