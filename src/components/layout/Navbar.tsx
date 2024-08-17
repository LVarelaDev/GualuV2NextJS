"use client";
import {
  faArrowLeft,
  faBarsStaggered,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import Text from "../ui/Text";
import { routingMenu } from "./menu";
import { Link } from "next-view-transitions";
import { Toaster } from "react-hot-toast";

type TNavbar = {
  session: Session | null;
  children: React.ReactNode;
};

const Navbar = ({ session, children }: TNavbar) => {
  const [showSignOut, setShowSignOut] = useState(false);
  const [colpaseSideNav, setColapseSideNav] = useState(false);
  const [menuSelected, setMenuSelected] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMenuSelected(window.location.pathname);
    }
  }, []);

  const handleShowSignOut = () => {
    setShowSignOut(!showSignOut);
  };

  const handleColapseSideNav = () => {
    setColapseSideNav(!colpaseSideNav);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`flex flex-col justify-between bg-white h-full p-3 ${
          colpaseSideNav
            ? "w-20 transition-all duration-500 ease-in-out"
            : "w-72 transition-all duration-500 ease-in-out"
        }`}
      >
        <div
          className={`flex ${
            colpaseSideNav ? "flex-col " : "flex-row justify-between items-center"
          } gap-3`}
        >
          <p
            className={`flex justify-center text-lg text-gray-600 ${
              colpaseSideNav ? "" : "ml-4"
            } font-bold`}
          >
            <Image
              width={70}
              height={70}
              src="images/logo_gualu.svg"
              alt="logo"
            />
          </p>
          <button
            onClick={handleColapseSideNav}
            className={`p-2 rounded hover:bg-purpleSmooth hover:text-white text-gray-600`}
          >
            <FontAwesomeIcon icon={faBarsStaggered} />
          </button>
        </div>

        <div className="flex flex-1">
          <div className="flex flex-col gap-3 py-7 w-full items-center border-t mt-2">
            {routingMenu.map((item) => (
              <Link
                key={item.name}
                onClick={() => setMenuSelected(item.route)}
                href={item.route}
                className={`flex gap-3 w-full rounded ${
                  item.route == menuSelected ? "bg-primary text-white" : ""
                } font-bold px-5 py-3 text-gray-600 ${
                  item.route == menuSelected
                    ? " text-white"
                    : "hover:text-purplePrimary"
                } hover:transition-all duration-500 ease-in-out`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="cursor-pointer"
                  size="lg"
                />
                {!colpaseSideNav ? item.name : ""}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <nav
          className={`flex w-full justify-between gap-3 shadow-b-md py-3 px-2 bg-white transition-all duration-500 ease-linear`}
        >
          <div className="flex gap-3 items-center w-full px-4">
            <div className="flex justify-between w-full items-center">
              <Text size="text-lg" weigth="font-bold">
                Gualú - CRM
              </Text>
              <div className="flex items-center gap-3">
                {session?.user && (
                  <>
                    <div className="font-bold text-sm text-gray-500">
                      {session.user.name}
                    </div>
                    <div className="flex flex-col items-center">
                      {session.user.image && (
                        <Image
                          src={session.user.image}
                          alt="Perfil"
                          height={35}
                          width={35}
                          className="rounded-full cursor-pointer"
                          onClick={handleShowSignOut}
                        />
                      )}
                      {showSignOut && (
                        <div className="absolute mt-14 bg-white shadow-lg border border-gray-300 rounded-lg w-32 mr-20 flex flex-col justify-center p-2 gap-2 items-center transition-all duration-500 ease-in animate-slide-down">
                          <div className="flex gap-2 justify-center items-center font-bold text-xs text-gray-500">
                            <FontAwesomeIcon icon={faUser} />
                            Perfil
                          </div>
                          <div
                            className="flex gap-2 border-t-2 pt-2 justify-center text-xs w-full font-bold text-gray-500 hover:text-purplePrimary cursor-pointer"
                            onClick={() => signOut({ callbackUrl: "/login" })}
                          >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            Cerrar sesión
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
        <div className="flex-1 overflow-y-auto p-5 custom-scroll">
          {children}
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
