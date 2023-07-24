import { useQuery } from "@apollo/client";
import { GET_ENGINEERS } from "../../queries/EngineerQueries";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EngineersTable from "../../components/engineer-components/table/EngineersTable";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import CustomAlert from "../../components/alerts/CustomAlert";

const EngineersList = ({ filter }) => {
  const navigate = useNavigate();
  const location = useLocation();
  window.history.replaceState({}, document.title);
  const showAlert = location.state?.showAlert;
  const { data, loading, error, refetch } = useQuery(GET_ENGINEERS, {
    variables: { _ilike: `%${filter}%` }
  });
  useEffect(() => {
    refetch();
  }, [filter]);
  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LoadingSpinner />
      </div>
    );
  if (error) return `Loading error! ${error.message}`;
  return (
    <>
      <EngineersTable filter={filter} data={data} navigate={navigate} />
      {showAlert === -1 && (
        <CustomAlert
          onClose={() => {
            navigate("/engineers", { state: { showAlert: 0 } });
          }}
          severity="error"
          message={"Error adding engineer!"}
        />
      )}
      {showAlert === 1 && (
        <CustomAlert
          onClose={() => {
            navigate("/engineers", { state: { showAlert: 0 } });
          }}
          severity="success"
          message={"Engineer added successfully!"}
        />
      )}
    </>
  );
};
export default EngineersList;
