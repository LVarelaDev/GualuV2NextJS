"use client";
import { Session } from "next-auth";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

type TNavbar = {
  session: Session | null;
  children: React.ReactNode;
};

const Navbar = ({ session, children }: TNavbar) => {
  return (
    <div className="flex flex-col">
      <nav className="flex justify-between bg-[#d87a1c] text-white px-10 py-1 items-center">
        <Image
          src="images/logo_gualu.svg"
          alt="logo"
          width={100}
          height={100}
        />

        {session?.user && (
          <div className="flex justify-center items-center gap-4">
            <div>
              Bienvenido:{" "}
              <span className="text-base font-bold">{session.user.name}</span>
            </div>
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="Perfil"
                height={45}
                width={45}
                className="rounded-full cursor-pointer"
              />
            )}

            <button
              onClick={async () => {
                await signOut();
              }}
            >
              Cerrar
            </button>
          </div>
        )}
      </nav>
      <div className="flex">
        <div className="flex flex-1 flex-col p-3 h-screen max-h-screen bg-purplePrimary max-w-48">
          <ul className="text-white flex flex-col gap-3 justify-center items-center">
            <li className="hover:bg-purpleSmooth w-full text-center py-3 rounded-lg transition duration-300 ease-in-out">
              Home
            </li>
            <li className="hover:bg-purpleSmooth w-full text-center py-3 rounded-lg transition duration-300 ease-in-out">
              Home
            </li>
            <li className="hover:bg-purpleSmooth w-full text-center py-3 rounded-lg transition duration-300 ease-in-out">
              Home
            </li>
            <li className="hover:bg-purpleSmooth w-full text-center py-3 rounded-lg transition duration-300 ease-in-out">
              Home
            </li>
          </ul>
        </div>
        <div className="flex flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Navbar;
