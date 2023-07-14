import { ADD_ENGINEER, GET_ENGINEERS } from "../../queries/EngineerQueries";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import EngineerForm from "./EngineerForm";

const CreateEngineer = () => {
  const navigate = useNavigate();
  const [addEngineer, { loading, error }] = useMutation(ADD_ENGINEER, {
    refetchQueries: [{ query: GET_ENGINEERS }]
  });
  const handleFormSubmit = (formData) => {
    addEngineer({ variables: { name: formData.name } });
    navigate("/engineers");
  };

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <Dialog open={true}>
      <EngineerForm onSubmit={handleFormSubmit} />
    </Dialog>
  );
};
export default CreateEngineer;
