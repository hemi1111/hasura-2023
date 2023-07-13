import React, { useState } from "react";
import ManagerNavbar from "../../components/ManagerNavbar";
import { TextField, Button } from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { GET_MANAGERS } from "../../queries/ManagerQueries";
const CREATE_MANAGER = gql`
  mutation CreateManager($name: String!) {
    insert_users_one(object: { name: $name, roles: ["manager"] }) {
      id
      created_at
      modified_at
      name
    }
  }
`;

const UPDATE_MANAGER = gql`
  mutation UpdateManager($id: Int!, $name: String!) {
    update_managers(where: { id: { _eq: $id } }, _set: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;

const CreateManager = () => {
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  const [createManager, { loading, error, data }] = useMutation(
    CREATE_MANAGER,
    {
      refetchQueries: [
        {
          query: GET_MANAGERS
        }
      ]
    }
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    createManager({
      variables: { name }
    });
    setName("");
    console.log(data);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
  };
  if (loading) return <p>Loading...</p>;
  if (error) throw error;
  return (
    <div>
      <ManagerNavbar />
      {update ? (
        <form onSubmit={handleSubmit}>
          <TextField
            value={name}
            label="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            value={name}
            label="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default CreateManager;
