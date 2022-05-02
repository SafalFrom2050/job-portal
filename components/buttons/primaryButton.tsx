import React from 'react';

function PrimaryButton(props: {name: string}) {
    return (
        <button className="mx-2 my-2 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs">{props.name}</button>
    );
}

export default PrimaryButton;