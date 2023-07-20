import React, { useState } from "react";
import ManagerNavbar from "../../components/ManagerNavbar";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CREATE_MANAGER, GET_MANAGERS } from "../../queries/ManagerQueries";
import { useNavigate } from "react-router-dom";
import UserForm from "../../components/UserForm";

const CreateManager = () => {
  const navigate = useNavigate();
  const form = useForm();

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
  const styleForm = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "clamp(450px,30px,430px)",
    margin: "0 auto",
    border: "1px solid #ccc",
    borderRadius: "0.35rem",
    padding: "1.5rem",
    flexDirection: "column",
    gap: "1rem"
  };

  const handleFormSubmit = (data) => {
    console.log(data);
    const { name } = data;
    createManager({
      variables: { name }
    });

    navigate("/managers");
  };

  if (loading) return <p>Loading...</p>;
  if (error) throw error;
  return (
    <>
      <ManagerNavbar />
      <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
        <UserForm form={form} onSubmit={handleFormSubmit} manager={true} />
      </div>
    </>
  );
};

export default CreateManager;
