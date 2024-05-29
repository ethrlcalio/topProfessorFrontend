// DefaultDisplay.jsx

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faChalkboardUser, faUsers } from "@fortawesome/free-solid-svg-icons";

const DefaultDisplay = ({ icon }) => {
  const message = icon === "star"
    ? "Rate your professors honestly"
    : icon === "chalkboard"
    ? "Your feedback will improve teaching"
    : "As well as improve university life";

  const selectedIcon = icon === "star"
    ? faStar
    : icon === "chalkboard"
    ? faChalkboardUser
    : faUsers;

  return (
    <div className="bg-anti-flash flex flex-col items-center"> {/* Added 'items-center' */}
      <div className="w-full flex justify-center p-6 -pb-6">
        <FontAwesomeIcon
          icon={selectedIcon}
          className="text-penn-blue h-32 w-32 m-4"
        />
      </div>
      <div className="flex flex-col align-center m-2 items-center p-6 text-center"> {/* Added 'text-center' */}
        <h2 className="font-montserrat text-2xl text-penn-blue font-semibold pt-2">
          {message}
        </h2>
      </div>
    </div>
  );
};

export default DefaultDisplay;
