import React, {useState} from 'react';

const Dropdown = (props: { options: { key: String, value: String }[], onSelect: (key: String) => boolean, label?: string }) => {

    const [show, setShow] = useState(false);

    const [selectedOption, setSelectedOption] = useState(props.label == undefined ? "Select" : props.label);

    function toggle() {
        setShow(!show)
    }

    function selectOption(key: string, value: string) {
        setSelectedOption(value)
        props.onSelect(key)
        toggle()
    }

    return (
        <div className="relative ">
            <div className="relative w-full border border-gray-300 rounded outline-none dropdown-one">
                <button onClick={toggle} className="relative flex items-center justify-between w-full px-5 py-2">
                      <span className="pr-4 text-sm font-medium text-gray-600" id="drop-down-content-setter">
                        {String(selectedOption)}
                      </span>
                    <svg id="rotate" className="absolute z-10 cursor-pointer right-5" width={10} height={6}
                         viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.5 0.75L5 5.25L9.5 0.75" stroke="#4B5563" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </button>
                <div
                    className={`${show ? "" : "hidden"} absolute z-20 right-0 w-full px-1 py-2 top-12`}
                    id="drop-down-div">
                    <div className={"fixed top-0 left-0 h-screen w-screen z-0"} onClick={toggle}></div>
                    <div
                        className={"w-full absolute flex flex-col z-30 bg-white border-t border-gray-200 rounded shadow"}>

                        {props.options.map((option, index) => {

                            return (
                                <a key={index} onClick={() => selectOption(String(option.key), String(option.value))}
                                   className="hover"><p
                                    className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded">
                                    {option.value}
                                </p></a>
                            );
                        })
                        }
                    </div>
                </div>
            </div>
            {/* end */}
        </div>
    );
};

export default Dropdown;
