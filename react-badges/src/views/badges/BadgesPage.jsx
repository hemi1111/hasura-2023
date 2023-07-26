import React, { useState } from "react";
import BadgeDisplay from "../../components/badges-components/table/BadgeDisplay";
import BadgeSearchBar from "../../components/badges-components/table/BadgeSearchBar";

const BadgesPage = () => {

  const [searchBar, setSearchBar] = useState("");

  return (
    <div>
      <BadgeSearchBar search={searchBar} setSearchBar={setSearchBar}/>
      <BadgeDisplay search={searchBar} />
    </div>
  );
};

export default BadgesPage;
