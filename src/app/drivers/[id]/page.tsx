"use client";
import CreateDriver from "@/components/pages/drivers/Create";
import React from "react";
import UpdateDriver from "../../../components/pages/drivers/Update";

const page = ({ params }: { params: any }) => {
  const { id } = params;

  return <>{id === "0" ? <CreateDriver /> : <UpdateDriver document={id} />}</>;
};

export default page;
