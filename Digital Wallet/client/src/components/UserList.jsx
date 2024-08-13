import React, { useRef } from "react";
import useSendMoney from "../hooks/useSendMoney";

const UserList = ({ user, handleOnClick }) => {
  return (
    <div
      className=" border-b-2 border-gray-100   flex items-center justify-between hover:bg-slate-400"
      key={user.id}
    >
      <p className="px-3 py-1">{user.name}</p>
      <button
        className="bg-green-400 py-1 px-3 rounded cursor-pointer text-white font-bold flex items-center gap-3"
        onClick={()=>(handleOnClick(user))}
      >
        Send Money{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default UserList;
