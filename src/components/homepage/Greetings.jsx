import React from "react";
import trashImg from "../../assets/images/trash.jpg";

const Greetings = () => {
  const currentHour = new Date().getHours();

  let greeting = "";
  if (currentHour >= 0 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <div className="">
      <div className="px-4 mt-8">
        <h2 className="text-xl font-semibold">{greeting}, User</h2>
        <p className="text-gray-500 mt-1">
          Do you have extra trash to dispose today?
        </p>
      </div>

      <div className="mt-4 h-72 relative overflow-hidden rounded-lg">
        <img
          src={trashImg}
          alt="Trash"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/90 to-transparent"></div>
        <div className="absolute bottom-6 left-4 text-gray-800">
          <h3 className="text-lg font-bold">Always use the proper trashcan</h3>
          <p className="text-sm text-gray-500 pb-4">
            Especially in public places to keep our surroundings clean.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Greetings;
