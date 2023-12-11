import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const Loading = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <PropagateLoader color="#006400" size={15} />
    </div>
  );
};

export default Loading;
