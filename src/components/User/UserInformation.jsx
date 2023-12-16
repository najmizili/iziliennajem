import React from "react";
import { useAuth } from "../../context/AuthContext";

const UserInformation = () => {
  const auth = useAuth();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white dark:bg-navy-800 bg-clip-border shadow-3xl dark:border-none p-3">
        <div className="mt-2 mb-8 w-full">
          <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          General information
          </h4>
          <p className="mt-2 px-2 text-base text-gray-600">
          General user information will be displayed here.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-2xl">
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {auth.user ? auth.user.email : "No se ha encontrado el email"}
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white px-3 py-4 shadow-2xl">
            <p className="text-sm text-gray-600">Last connection date</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              {auth.user
                ? auth.user.metadata.lastSignInTime
                : "No se ha encontrado la fecha"}
            </p>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-2xl">
            <p className="text-sm text-gray-600">Additional Information</p>
            <p className="text-base font-medium text-navy-700 dark:text-white"></p>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white px-3 py-4 shadow-2xl">
            <p className="text-sm text-gray-600">Work History</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              English, Spanish, Italian
            </p>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white px-3 py-4 shadow-2xl">
            <p className="text-sm text-gray-600">Organization</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              Simmmple Web LLC
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white px-3 py-4 shadow-2xl">
            <p className="text-sm text-gray-600">Birthday</p>
            <p className="text-base font-medium text-navy-700 dark:text-white">
              18 April 2004
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default UserInformation;
