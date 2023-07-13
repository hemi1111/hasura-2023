import { Button, Dialog, DialogTitle, List, ListItem } from "@mui/material";
import {
  GET_ENGINEER,
  GET_ENGINEERS,
  UPDATE_ENGINEER
} from "../../queries/EngineerQueries";
import { useMutation, useQuery } from "@apollo/client";
import EngineerForm from "./EngineerForm";
import { useNavigate, useParams } from "react-router-dom";

const EditEngineer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateEngineer, { loading, error }] = useMutation(UPDATE_ENGINEER, {
    refetchQueries: [{ query: GET_ENGINEERS }]
  });
  const { data } = useQuery(GET_ENGINEER, {
    variables: { id: id }
  });
  const handleFormSubmit = (formData) => {
    updateEngineer({ variables: { id: id, name: formData.name } });
    navigate("/engineers");
  };
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <Dialog open={true}>
      <EngineerForm user={data?.engineers} onSubmit={handleFormSubmit} />
    </Dialog>
  );
};
export default EditEngineer;
