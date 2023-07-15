import { ADD_ENGINEER, GET_ENGINEERS } from "../../queries/EngineerQueries";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import EngineerForm from "../../components/engineer-components/form/EngineerForm";

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

  return <EngineerForm onSubmit={handleFormSubmit} />;
};
export default CreateEngineer;
