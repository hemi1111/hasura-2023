import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ENGINEERS,
  GET_MANAGERS_BY_ENGINEER
} from "../../queries/EngineerQueries";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EngineersTable from "../../components/engineer-components/table/EngineersTable";

const EngineersList = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_ENGINEERS);
  if (loading) return "Loading...";
  if (error) return `Loading error! ${error.message}`;
  return <EngineersTable data={data} navigate={navigate} />;
};
export default EngineersList;
