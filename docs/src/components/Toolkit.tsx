import React, { useState, useEffect } from "react";
import { loginButtons, transactionButtons } from "../constants/ButtonData"

interface Button {
  id: string;
  icon: string;
  label: string;
  dependencies: string;
  importData: string;
  initialization: string;
}

const Toolkit = () => {
  const [activeLoginType, setActiveLoginType] = useState<Button>(
    loginButtons[0]
  );
  const [transactionType, setTransactionType] = useState<Button>(
    transactionButtons[0]
  );
  const [dependencies, setDependencies] = useState("");
  const [imports, setImports] = useState("");
  const [initializationCode, setInitializationCode] = useState("");

  useEffect(() => {
    updateDependencies([activeLoginType, transactionType]);
    updateImports([activeLoginType, transactionType]);
    updateInitializationCode([activeLoginType, transactionType]);
  }, [activeLoginType, transactionType]);

  const updateDependencies = (buttons: Button[]) => {
    const newDependencies = buttons
      .map((button) => button.dependencies)
      .join("\n");
    setDependencies(newDependencies);
    console.log("New Dependencies final", newDependencies);
  };

  const updateImports = (buttons: Button[]) => {
    const newImport = buttons.map((button) => button.importData).join("\n");
    setImports(newImport);
    console.log("New Imports final", newImport);
  };

  const updateInitializationCode = (buttons: Button[]) => {
    const newInitializationCode = buttons
      .map((button) => button.initialization)
      .join("\n");
    setInitializationCode(newInitializationCode);
    console.log("New Initialization Code final", newInitializationCode);
  };

  const handleLoginButtonClick = (button: Button) => {
    setActiveLoginType(button);
  };

  const handleTransactionButtonClick = (button: Button) => {
    setTransactionType(button);
  };

  return (
    <div className="flex flex-row justify-between items-start w-[130%] h-auto">
      <div className="flex flex-col justify-start items-start w-[35%] h-auto">
        <span className="font-bold text-2xl pb-2">Sign with EOA</span>
        <div className="grid grid-cols-3 gap-x-6 gap-y-2 pb-4">
          {loginButtons.slice(8, 11).map((button) => (
            <button
              key={button.id}
              className={`flex items-center justify-start w-[6rem] h-[2.5rem] px-4 py-2 my-1 bg-gray-800 text-white border-0 rounded-lg cursor-pointer transition-colors duration-300 ${
                activeLoginType.id == button.id ? "bg-red-500" : ""
              }`}
              onClick={() => handleLoginButtonClick(button)}
            >
              {/* <img src={button.icon} alt={button.label} width={20} /> */}
              <span>{button.label}</span>
            </button>
          ))}
        </div>
        <span className="font-bold text-2xl pb-2">Social Logins</span>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 pb-4">
          {loginButtons.slice(0, 8).map((button) => (
            <button
              key={button.id}
              className={`flex items-center justify-start w-[10rem] h-[2.5rem] px-4 py-2 my-1 bg-gray-800 text-white border-0 rounded-lg cursor-pointer transition-colors duration-300 ${
                activeLoginType.id == button.id ? "bg-red-500" : ""
              }`}
              onClick={() => handleLoginButtonClick(button)}
            >
              {/* <img src={button.icon} alt={button.label} width={20} /> */}
              <span>{button.label}</span>
            </button>
          ))}
        </div>

        <span className="font-bold text-2xl pb-2">Executing Transactions</span>
        <div className="grid grid-cols-3 gap-x-6 gap-y-2 pb-4">
          {transactionButtons.map((button) => (
            <button
              key={button.id}
              className={`flex items-center justify-start w-[6rem] h-[2.5rem] px-4 py-2 my-1 bg-gray-800 text-white border-0 rounded-lg cursor-pointer transition-colors duration-300 ${
                transactionType.id == button.id ? "bg-red-500" : ""
              }`}
              onClick={() => handleTransactionButtonClick(button)}
            >
              {/* <img src={button.icon} alt={button.label} width={20} /> */}
              <span>{button.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-start items-start w-[65%] h-[30rem] py-2 px-4">
        <span className="mb-2">Dependencies</span>
        <div className="flex flex-col bg-[#131417] border-solid border-[1px] border-opacity-60 border-gray-500 justify-start items-start w-full h-[3.5rem] rounded-md overflow-x-auto py-2 px-4 mb-2 hide-scrollbar">
          npm i {dependencies}
        </div>
        <span className="mb-2">Code</span>
        <div className="flex flex-col bg-[#131417] border-solid border-[1px] border-opacity-60 border-gray-500 justify-start items-start w-full h-full rounded-md overflow-y-auto overflow-x-auto py-2 px-4">
          <div className="w-full h-full">
            {" "}
            {/* <CopyBlock
              text={imports + initializationCode}
              language="typescript"
              theme={vs2015}
              customStyle={{ backgroundColor: "#131417" }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolkit;
