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

  const [addRelation, r2] = useMutation(ADD_RELATION);
  useEffect(() => {
    refetch();
  }, []);
  const dothis = () => {
    if (checkedItems.length > 0)
      for (let i = 0; i < checkedItems.length; i++) {
        let engineer = parseInt(checkedItems[i]);
        addRelation({
          variables: { manager, engineer }
        });
      }
  };

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

  console.log(dataEngr ? dataEngr.get_unassigned_engineers : null);
  console.log(typeof checkedItems[0]);
  console.log(data);
  if (loading) return "loading...";
  if (error) throw r1.error;

  return (
    <div>
      <ManagerNavbar />
      <Typography variant="h6" sx={{ marginTop: "20px", marginBottom: "5px" }}>
        Manager-Engineer Connection
      </Typography>
      {manager} - {engineer}
      <div>
        <h4>Managers</h4>
        <select onChange={(e) => setManager(e.target.value)}>
          <option key={0} value="">
            -Select-
          </option>
          {data.managers.map((record) => (
            <option key={record.id} value={record.id}>
              {record.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h4>Engineers</h4>

        {dataEngr &&
          dataEngr.get_unassigned_engineers.map((engineer) => (
            <div key={engineer.id}>
              <input
                type="checkbox"
                id={engineer.id}
                value={engineer.id}
                onChange={handleCheckbox}
              />
              <label htmlFor={engineer.id}>{engineer.name}</label>
            </div>
          ))}
      </div>
      <Button onClick={handleShowEngineer}>Show Engineers</Button>
      <Button onClick={dothis}>Add</Button>
      <hr></hr>
      <hr></hr>
      <TableComp r1={data} />
    </div>
  );
};

export default ManagerEngineer;
