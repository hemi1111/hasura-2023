import { useQuery } from "@apollo/client";
import { GET_ENGINEERS } from "../../queries/EngineerQueries";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EngineersTable from "../../components/engineer-components/table/EngineersTable";

const EngineersList = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(GET_ENGINEERS);
  useEffect(() => {
    refetch();
  }, []);
  if (loading) return "Loading...";
  if (error) return `Loading error! ${error.message}`;
  return <EngineersTable data={data} navigate={navigate} />;
};
export default EngineersList;
