import React, { useRef, useState } from "react";
import useSendMoney from "../hooks/useSendMoney";

const EnterAmntPopup = ({ user, setUser }) => {
  const [response, setResponse] = useState(null);
  const ref = useRef(null);

  const handleSubmit = async () => {
    const reply = await useSendMoney({ ...user, amount: ref.current.value });
    setResponse(reply);
  };

  return (
    <div className="px-3 py-4 bg-white rounded-lg shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <button className="w-6 h-6 float-right flex items-center justify-center text-white text-2xl font-bold rounded-full bg-red-600 cursor-pointer" onClick={()=>(setUser(null))}>
        &times;
      </button>

      {response ? (
        <div>
          <h3 className="text-lg font-semibold text-green-500 mb-2 px-2">
            Transaction Successful
          </h3>
          <p>{response.message}</p>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Send Money to {user.name}
          </h3>
          <input
            ref={ref}
            type="number"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
          <button
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            onClick={handleSubmit}
          >
            Send 
          </button>
        </>
      )}
    </div>
  );
};

export default EnterAmntPopup;
