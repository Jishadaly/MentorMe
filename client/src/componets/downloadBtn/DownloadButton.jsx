// DownloadButton.js
import React from "react";
import { saveAs } from "file-saver";
import { DownloadIcon } from "../icons/chatIcons";
const DownloadButton = ({ url, fileName }) => {
  const handleClick = () => {
    saveAs(url, fileName);
  };

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-indigo-500 px-4 py-2 rounded-md"
    >
      <DownloadIcon className="w-5 h-5" />
    </button>
  );
};

export default DownloadButton;
