import React from 'react';

function WhiteButton(props: {name: string}) {
    return (
        <button
            className="mx-2 my-2 bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-indigo-700 px-6 py-2 text-xs">{props.name}</button>
    );
}

export default WhiteButton;