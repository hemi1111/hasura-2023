import React, { useEffect, useState } from "react";
import ManagerNavbar from "../../components/ManagerNavbar";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  DELETE_RELATION,
  GET_ENGINEERS_BY_MANAGER,
  GET_MANAGER,
  GET_MANAGERS,
  UPDATE_MANAGER
} from "../../queries/ManagerQueries";
import { Button, TextField } from "@mui/material";
const EditManager = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({ mode: "onChange" });
  const { data, loading, error } = useQuery(GET_MANAGER, {
    variables: { id }
  });

  const [updateManager] = useMutation(UPDATE_MANAGER, {
    refetchQueries: [
      {
        query: GET_MANAGERS
      }
    ]
  });
  const [
    getEngineerByMngr,
    { data: dataEngr, loading: loadingEngr, error: errorEngr }
  ] = useMutation(GET_ENGINEERS_BY_MANAGER);
  const [deleteRelation] = useMutation(DELETE_RELATION, {});
  useEffect(() => {
    if (data) setValue("name", data.managers[0].name);
    const fetchEngr = () => {
      getEngineerByMngr({
        variables: { id: id }
      });
    };
    fetchEngr();
  }, [data]);
  const handleDelete = (engrId) => {
    const engineer_id = engrId;
    const manager_id = id;
    deleteRelation({
      variables: { manager_id, engineer_id }
    }).then(() => {
      getEngineerByMngr({
        variables: { id: manager_id }
      });
    });
  };
  console.log(dataEngr && dataEngr.get_engineers_by_manager);
  const onsubmit = (e) => {
    const { name } = e;
    console.log(e.name);
    updateManager({
      variables: { id, name }
    });
    console.log("updated");
  };
  if (loading) return <p>Loadin...</p>;
  if (error) throw error;

  const styleForm = {
    display: "flex",
    justifyContent: "center",
    // height: "80%",
    alignItems: "center",
    width: "clamp(450px,30px,430px)",
    margin: "0 auto",
    border: "1px solid #ccc",
    borderRadius: "0.35rem",
    padding: "1.5rem",
    flexDirection: "column",
    gap: "1rem"
  };
  return (
    <>
      <ManagerNavbar />
      <div style={{ display: "flex" }}>
        <form onSubmit={handleSubmit(onsubmit)} style={styleForm}>
          <TextField
            {...register("name", {
              required: {
                value: true,
                message: "shkruj na 1 sen"
              }
            })}
            error={!!errors.name}
            helperText={errors?.name && errors.name.message}
          />
          <Button variant="outlined" type="submit">
            Save
          </Button>
        </form>
        <ul></ul>
        <div style={{ width: "50%" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Engineers</TableCell>
                  <TableCell align="center">Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataEngr &&
                  dataEngr.get_engineers_by_manager.map((engineer) => (
                    <TableRow key={engineer.id}>
                      <TableCell>{engineer.name}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            handleDelete(engineer.id);
                          }}
                        >
                          DElete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default EditManager;
{
  /* <>
<li key={engineer.id} style={{ display: "inline" }}>
  {engineer.name}
</li>
<Button
  onClick={() => {
    handleDelete(engineer.id);
  }}
>
  Delete
</Button>
</> */
}
