import { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import BasicPage from "../../layouts/BasicPage/BasicPage";
import FakeContent from "../../components/FakeContent";
import { Button, FormControlLabel, FormGroup, Typography } from "@mui/material";
import ManagerNavbar from "../../components/ManagerNavbar";
import {
  ADD_RELATION,
  GET_ENGINEERS_BY_MANAGER,
  GET_MANAGERS,
  GET_UNASSIGNED_ENGINEERS
} from "../../queries/ManagerQueries";
import TableComp from "./TableComp";
import { CheckBox } from "@mui/icons-material";

const ManagerEngineer = () => {
  const [manager, setManager] = useState(null);
  const [engineer, setEngineer] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);

  const [getEngineerByMngr, { loading: loadingEngByMngr }] = useMutation(
    GET_ENGINEERS_BY_MANAGER
  );

  const { loading, data, error, refetch } = useQuery(GET_MANAGERS);
  const [getUnassignedEngr, { data: dataEngr, loading: loadingEngr }] =
    useMutation(GET_UNASSIGNED_ENGINEERS);

  useEffect(() => {
    refetch();
  }, []);

  const handleShowEngineer = () => {
    if (manager)
      getUnassignedEngr({
        variables: { manager }
      });
  };
  const handleCheckbox = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setCheckedItems([...checkedItems, value]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== value));
    }
  };

  return (
    <div>
      <TableComp r1={data} />
    </div>
  );
};

export default ManagerEngineer;
