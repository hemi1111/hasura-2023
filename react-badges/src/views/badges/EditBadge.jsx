import React from "react";
import BadgesNavbar from "../../components/BadgesNavbar";
import { useParams, useNavigate } from "react-router-dom";
const EditBadge = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <BadgesNavbar />
    </div>
  );
};

export default EditBadge;
