import React from "react";


function SearchHeader() {

    return(
        <div className="pb-8">
            <h1 className="text-6xl font-extralight text-center text-primary font-serif mt-10 mb-10">Exclusive events, priceless moments</h1>
            <div className="mt-6 flex justify-center ">
            <input
                type="text"
                placeholder="Search by events, name, location and more"
                className="border p-2 mr-2 rounded-lg w-96"
            />
            <input type="date" className="border p-2 rounded-lg mr-2" />
            <button className="bg-primary rounded-lg text-white px-4 py-2">Search</button>
            </div>
        </div>
    )
}


export default SearchHeader;