import React from 'react'
import { Typography,Button } from "@mui/material";
import {useNavigate} from 'react-router-dom'
import './navStyle.css'
const BadgesNavbar = () => {

  const navigate = useNavigate();

  const handleShowBadges = () => {
    navigate('/badges')
  }

  const handleCreateBadge = () => {
    navigate('/badges/create')
  }

  return (
    <div className="navbar-style">
      <Button color="inherit" onClick={handleShowBadges}>Show All Badges</Button>
      <Button color="inherit" onClick={handleCreateBadge}>Add New Badge</Button>
    </div>
  )
}

export default BadgesNavbar