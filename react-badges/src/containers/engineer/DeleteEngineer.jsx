import {
  DELETE_ENGINEER,
  GET_ENGINEERS,
  GET_ENGINEER_BY_MANAGER
} from "../../queries/EngineerQueries";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import DeleteEngineerDialog from "../../components/engineer-components/dialog/DeleteEngineerDialog";

const DeleteEngineer = ({ open, id, name, onClose }) => {
  const [deleteEngineer, { loading, error }] = useMutation(DELETE_ENGINEER, {
    refetchQueries: [{ query: GET_ENGINEERS }]
  });
  const [getEngineers, { data }] = useMutation(GET_ENGINEER_BY_MANAGER);
  const handleClick = () => {
    deleteEngineer({ variables: { id: id } }).then(() => onClose());
  };
  useEffect(() => {
    getEngineers({
      variables: { id: id }
    });
  }, []);

  return (
    <DeleteEngineerDialog
      engineers={data?.get_engineers_by_manager}
      open={open}
      onClose={onClose}
      name={name}
      onClick={handleClick}
    />
  );
};
export default DeleteEngineer;
