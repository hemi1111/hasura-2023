import React from "react";
import { RouteProps } from "react-router-dom";

import {
  SupervisorAccount as ManagersIcon,
  Engineering as EngineersIcon,
  Security as ShieldIcon
} from "@mui/icons-material";

import AppEntrypoint, { BackofficeIcon } from "./containers/AppEntrypoint";
import ManagerEngineer from "./views/backoffice/ManagerEngineer";
import { DrawerMenu } from "./layouts/BasicLayout";
import EngingeerPage from "./views/engineer/EngineerPage";
import BadgesPage from "./views/badges/BadgesPage";
import CreateBadge from "../src/containers/badges/CreateBadge";
import EditBadge from "../src/containers/badges/EditBadge";
import EditManager from "./containers/manager/EditManager";
import CreateManager from "./containers/manager/CreateManager";
import CreateEngineer from "./containers/engineer/CreateEngineer";
import BadgesVersions from "../src/components/badges-components/versions table/BadgesVersions";
import EditEngineer from "./containers/engineer/EditEngineer";
const menuItems = [
  {
    link: "managers",
    text: "Managers",
    icon: <ManagersIcon />
  },
  {
    link: "engineers",
    text: "Engineers",
    icon: <EngineersIcon />
  },
  {
    link: "badges",
    text: "Badges Definitions",
    icon: <ShieldIcon />
  }
];

const AppBackoffice: React.FC = () => (
  <AppEntrypoint
    icon={<BackofficeIcon />}
    title={"Backoffice"}
    defaultRoute="managers"
    drawerContents={[<DrawerMenu title="Backoffice:" items={menuItems} />]}
    mobileUtils={menuItems}
    routes={
      [
        {
          path: "managers",
          element: <ManagerEngineer />
        },
        {
          path: "managers/edit/:id",
          element: <EditManager />
        },
        {
          path: "managers/create",
          element: <CreateManager />
        },
        {
          path: "engineers",
          element: <EngingeerPage />
        },
        {
          path: "engineer/edit/:id",
          element: <EditEngineer />
        },
        {
          path: "engineer/create",
          element: <CreateEngineer />
        },
        {
          path: "badges",
          element: <BadgesPage />
        },
        {
          path: "badges/edit/:id",
          element: <EditBadge />
        },
        {
          path: "badges/create",
          element: <CreateBadge />
        },
        {
          path: "badges/versions/:name/:id",
          element: <BadgesVersions />
        }
      ] as RouteProps[]
    }
  />
);

export default AppBackoffice;
