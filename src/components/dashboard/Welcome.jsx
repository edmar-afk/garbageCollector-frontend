import React from "react";
import welcomebg from "../../assets/images/welcomebg.png";
import filebg from "../../assets/images/filebg.png";

function Welcome() {
  return (
    <>
      <div
        className="mt-4 bg-cover bg-center rounded-lg overflow-hidden"
        style={{ backgroundImage: `url(${welcomebg})` }}
      >
        <div className="flex flex-row bg-white/50 backdrop-blur-sm justify-between px-14">
          <div className="flex flex-col p-4 w-[65%] py-12">
            <p className="font-semibold text-2xl">
              Welcome to eGovernment Archive
            </p>
            <p className="mb-8 italic">Your Secure Gateway to Government Records</p>
            <p className="font-extralight">
              Access, store, and protect essential government documents in one
              safe, easy-to-use platform. Designed for efficiency and security,
              the eGovernment Archive ensures your files remain organized,
              accessible, and safeguarded—anytime, anywhere.
            </p>
          </div>
          <div className="w-72 flex items-center justify-center">
            <img src={filebg} alt="" className="max-w-full" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
