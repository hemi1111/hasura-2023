import {
  DELETE_ENGINEER,
  GET_ENGINEERS,
  GET_ENGINEER_BY_MANAGER
} from "../../queries/EngineerQueries";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import DeleteDialog from "../../components/dialogs/DeleteDialog";

const DeleteEngineer = ({ open, id, name, onClose, filter }) => {
  const [deleteEngineer] = useMutation(DELETE_ENGINEER, {
    variables: { id },
    refetchQueries: [
      { query: GET_ENGINEERS, variables: { _ilike: `%${filter}%` } }
    ],
    onCompleted: () => onClose(1),
    onError: () => onClose(-1)
  });
  const [getEngineers, { data }] = useMutation(GET_ENGINEER_BY_MANAGER, {
    variables: { id }
  });

  useEffect(() => {
    getEngineers();
  }, []);

  return (
    <DeleteDialog
      list={data?.get_engineers_by_manager}
      open={open}
      onClose={onClose}
      name={name}
      onClick={() => deleteEngineer()}
    />
  );
};
export default DeleteEngineer;
