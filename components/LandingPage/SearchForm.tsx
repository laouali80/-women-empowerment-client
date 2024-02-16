"use client";
import React from "react";
import Icon from "../Common/Icons/Icon";

type Props = {
    placeholder: string
};

function SearchForm({placeholder}: Props) {
  return (
    <div className="w-full mx-auto flex justify-center items-center font-quickSand">
      <input
        type="text"
        name=""
        id=""
        placeholder={placeholder}
        // value={searchTerm}
        // onChange={handleSearchInputChange}
        className="w-[95%] py-2 md:py-4 border border-primaryWhite bg-primaryWhite rounded-l text-sm md:text-base text-gray-100 focus:outline-btnWarning p-2 "
      />
      <button
        // onClick={(e) => handleSearch(searchTerm, e)}
        className="bg-btnWarning p-2 md:p-4 rounded-br-md rounded-tr-md"
      >
        <Icon name="img_search" className="" />
      </button>
    </div>
  );
}

export default SearchForm;
