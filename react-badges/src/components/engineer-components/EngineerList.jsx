import { useQuery } from "@apollo/client";
import { GET_ENGINEERS } from "../../queries/EngineerQueries";
import { Box } from "@mui/material";

const EngineerList = () => {
  const { data } = useQuery(GET_ENGINEERS);

  return (
    <div>
      <h1>Engineer</h1>
      {data &&
        data.engineers.map((engineer, index) => {
          return (
            <Box key={index} sx={{ m: 2, color: "primary.main" }}>
              {engineer.name}
            </Box>
          );
        })}
    </div>
  );
};
export default EngineerList;
