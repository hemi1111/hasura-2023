import React from "react";
import BadgesNavbar from '../../components/BadgesNavbar'
import BadgeDisplay from "./BadgeDisplay";
const BadgesPage = () => {

  return (
    <div>
      <BadgesNavbar />
      <div>
        <BadgeDisplay />
      </div>
    </div>
  );
};

export default BadgesPage;
