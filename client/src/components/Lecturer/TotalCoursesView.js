import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      Total Courses
      <Typography component="p" variant="h4">
        32
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View All Courses
        </Link>
      </div>
    </React.Fragment>
  );
}
