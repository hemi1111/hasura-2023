import React from "react";
import ManagerNavbar from "../../components/ManagerNavbar";
import { gql, useMutation } from "@apollo/client";
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
          query: GET_MANAGERS,
          variables: { name: "%%" }
        }
      ]
    }
  );

  const handleFormSubmit = (data) => {
    console.log(data);
    const { name } = data;
    createManager({
      variables: { name }
    });
    const createNotify = {
      isOpen: true,
      type: "success",
      message: "Created successfuly"
    };
    navigate("/managers", { state: { createNotify } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) throw error;
  return (
    <>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <UserForm form={form} onSubmit={handleFormSubmit} manager={true} />
      </div>
    </>
  );
};

export default CreateManager;
