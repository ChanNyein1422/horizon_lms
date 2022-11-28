import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";

// Generate Order Data
function createData(id, name, email, dob, role, branch) {
  return { id, name, email, dob, role, branch };
}

const rows = [
  createData(0, "neokim", "n", "n", "n", "e"),
  createData(1, "john", "john", "john", "j", "d"),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    return fetch("https://localhost:5001/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };
  useEffect(() => {
    fetchData();
    console.log(users);
  }, []);

  return (
    <React.Fragment>
      User List
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>E mail</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="right">Branch</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.dob}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell align="right">{`$${row.branch}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more
      </Link>
    </React.Fragment>
  );
}
