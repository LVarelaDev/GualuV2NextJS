"use client";
import Button from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-full w-full bg-gradient-to-r from-[#c2410c] to-primary ">
      <div className="flex bg-white bg-opacity-10 rounded-2xl shadow-2xl gap-6">
        <div className="flex flex-1 items-center justify-center p-5">
          <div>
            <Image
              src="images/loginAnimico.svg"
              alt="foto"
              width={300}
              height={100}
            />
          </div>
        </div>
        <div className="flex flex-1 p-5 bg-white rounded-2xl">
          <div className="flex flex-col items-center justify-center gap-4 ">
            <Image
              src="images/logo_gualu.svg"
              alt="logo"
              width={100}
              height={100}
            />
            <div className="text-lg font-bold text-primary">
              Inicia sesión a través de tu cuenta Google
            </div>
            <Button
              color="bg-purplePrimary"
              className="w-full"
              onClick={() => signIn()}
            >
              Iniciar sesión
            </Button>

            <div className="flex flex-col">
              <p>Si tienes problemas para iniciar sesión, por favor,</p>
              <p>contáctate con los administradores del sistema</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
