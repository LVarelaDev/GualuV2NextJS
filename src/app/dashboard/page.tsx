"use client";
import Button from "@/components/ui/Button";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const DashboardPage = () => {
  const notify = () =>
    toast.success("Successfully created!", {
      position: "bottom-right",
    });
  return (
    <div>
      DashboardPage
      <Button className="bg-purplePrimary" onClick={() => notify()}>
        Click for show alert!
      </Button>
    </div>
  );
};

export default DashboardPage;
