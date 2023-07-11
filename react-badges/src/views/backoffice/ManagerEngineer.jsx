import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import BasicPage from "../../layouts/BasicPage/BasicPage";
import FakeContent from "../../components/FakeContent";
import { Button, Typography } from "@mui/material";

const GET_MANAGERS = gql`
  query getManagersAndEngineers {
    managers {
      id
      name
    }
    engineers {
      id
      name
    }
  }
`;

const ADD_RELATION = gql`
  mutation addRela($engineer: Int!, $manager: Int!) {
    insert_users_relations_one(
      object: { engineer: $engineer, manager: $manager }
    ) {
      manager
      engineer
      created_by
      created_at
    }
  }
`;

const ManagerEngineer = () => {
  const [manager, setManager] = useState(null);
  const [engineer, setEngineer] = useState(null);

  const r1 = useQuery(GET_MANAGERS);
  const [addRelation, r2] = useMutation(ADD_RELATION);

  const dothis = () => {
    addRelation({
      variables: { manager, engineer }
    });
  };

  if (r1.loading) return "loading...";
  if (r1.error) throw r1.error;

  return (
    <BasicPage fullpage title="Manager Section">
      <Typography variant="h6" sx={{ marginTop: "20px", marginBottom: "5px" }}>
        Manager-Engineer Connection
      </Typography>
      {manager} - {engineer}
      <div>
        <h4>Managers</h4>
        <select onChange={(e) => setManager(e.target.value)}>
          {r1.data.managers.map((record) => (
            <option key={record.id} value={record.id}>
              {record.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h4>Engineers</h4>
        <select onChange={(e) => setEngineer(e.target.value)}>
          {r1.data.engineers.map((record) => (
            <option key={record.id} value={record.id}>
              {record.name}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={dothis}>Add</Button>
      <hr />
      <FakeContent />
    </BasicPage>
  );
};

export default ManagerEngineer;
