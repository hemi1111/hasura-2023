import React from 'react'
import { Typography,Button } from "@mui/material";
import {useNavigate} from 'react-router-dom'
import './navStyle.css'
const EngineerNavbar = () => {

  const navigate = useNavigate();

  const handleShowEngineers = () => {
    navigate('/engineer')
  }

  const handleCreateEngineer = () => {
    navigate('/engineer/create')
  }

  return (
    <div className="navbar-style">
      <Button color="inherit" onClick={handleShowEngineers}>Show All Engineers</Button>
      <Button color="inherit" onClick={handleCreateEngineer}>Add New Engineer</Button>
    </div>
  )
}

export default EngineerNavbar