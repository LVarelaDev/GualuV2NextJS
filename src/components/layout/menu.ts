import {
  faChartSimple,
  faFilePdf,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";

export const routingMenu = [
  {
    route: "/dashboard",
    icon: faChartSimple,
    name: "Dashboard",
  },
  {
    route: "/drivers",
    icon: faIdCard,
    name: "Conductores",
  },
  {
    route: "/extracts",
    icon: faFilePdf,
    name: "Extractos",
  },
];
