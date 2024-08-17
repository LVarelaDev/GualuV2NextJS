"use client";
import Button from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  const handleSignIn = async () => {
    await signIn("provider", {
      callbackUrl: "/",
    });
  };

  return (
    <div className="bg-slate-100 h-screen">
      <div className="flex gap-8 justify-center items-center h-screen">
        <div className="flex flex-col gap-5 shadow-md bg-white border p-5 rounded-lg">
          <div className="flex flex-col gap-1">
            <div className="text-xl text-purplePrimary font-bold">
              <span className="text-primary font-bold">Gualú</span>CRM
            </div>
            <div className="text-base">
              Inicia sesión a través de tu cuenta Google
            </div>
          </div>
          <Button
            className="bg-purplePrimary text-white"
            onClick={async () => await handleSignIn()}
          >
            Iniciar sesion
          </Button>
          <div className="text-sm">
            Si tienes problemas para iniciar sesión, por favor,
            <br /> contáctate con el administrador
          </div>
        </div>
        <Image
          height={300}
          width={300}
          src="images/Securylogin-amico.svg"
          alt="logo"
        />
      </div>
    </div>
  );
};

export default LoginPage;
