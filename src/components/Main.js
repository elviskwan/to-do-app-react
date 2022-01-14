import { useState } from "react";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import "./style.scss";

export const Main = () => {
  const [job, setJob] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [edit, setEdit] = useState(false);
  const [clear, setClear] = useState(false);
  const [id, setId] = useState(0);

  const addJob = () => {
    setJob((job) => {
      let copy = [...job];
      let time = new Date().toDateString();
      copy = [
        ...copy,
        {
          id: job.length + 1,
          task: userInput,
          date: time,
          urgent: false,
          edit: false,
        },
      ];
      setJob(copy);
      setClear(true);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userInput !== "" ? addJob(userInput) : alert("Please insert a value!");
    setUserInput("");
  };

  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const resetAll = () => {
    setJob([]);
    setClear(false);
  };

  const deleteOne = (index) => {
    const newArr = job.filter((arr) => arr.id !== index);
    setJob(newArr);
  };

  const handleToggle = (ident) => {
    let mapped = job.map((task) => {
      return task.id === ident
        ? { ...task, urgent: !task.urgent }
        : { ...task };
    });
    setJob(mapped);
  };

  const goEdit = (index) => {
    const newArr = job.filter((arr) => arr.id === index);
    setUserInput(newArr[0].task);
    setEdit(true);
    setId(newArr[0].id);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    let mapped = job.map((task) => {
      return task.id === id ? { ...task, task: userInput } : { ...task };
    });
    setJob(mapped);
    setEdit(false);
    setUserInput("");
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <h2>TASK: </h2>
              </TableCell>
              <TableCell align="left">
                <h2>CREATED ON</h2>
              </TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {job &&
              job.map((j) => (
                <TableRow
                  key={j.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div className={j.urgent ? "urgent" : "basic"}>
                      <h3>{j.task}</h3>
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div className={j.urgent ? "urgent" : "basic"}>
                      <h3>{j.date}</h3>
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      onClick={() => {
                        deleteOne(j.id);
                      }}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                    >
                      DONE
                    </Button>
                    <Button
                      color="error"
                      size="small"
                      onClick={() => {
                        handleToggle(j.id);
                      }}
                      variant="outlined"
                      startIcon={<ReportGmailerrorredIcon />}
                    >
                      URGENT
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        goEdit(j.id);
                      }}
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <form onSubmit={!edit ? handleSubmit : handleEdit}>
        <input
          type="text"
          size="80"
          placeholder="Type your task here ..."
          name="job"
          value={userInput}
          onChange={handleChange}
        />
        {!edit && (
          <Button size="small" onClick={handleSubmit} variant="outlined">
            Submit
          </Button>
        )}
        {edit && (
          <Button size="small" onClick={handleEdit} variant="outlined">
            Save
          </Button>
        )}
      </form>
      <br />
      {/* check why this is not working */}
      {clear && (
        <Button variant="outlined" onClick={resetAll}>
          Clear All
        </Button>
      )}
    </div>
  );
};
