import React, { useState, useEffect, useRef } from "react";

//**event listener on non react dom object run first and then event listener on react component runs.
const Dropdown = ({ label, options, selected, onSelectedChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const onBodyClick = (event) => {
            if (ref.current.contains(event.target)) { //contains is a part of all dom objects and it tells wheter the certain dom obj is inside it.
              return; //if i am clicking on dashboard don't do anything for this body click listener as it is going to rerun setopen
            }
            setOpen(false);
          };
          document.body.addEventListener("click", onBodyClick, { capture: true });
      
          return () => { //during unmounting dropdown
            document.body.removeEventListener("click", onBodyClick, {
              capture: true,
            });
          };
    }, []);

    const renderedOptions = options.map((option) => {
        if (option.value === selected.value) {
            return null; //null value is react is considered empty..non list empty item.
        }

        return (
            <div
                key={option.value}
                className="item"
                onClick={() => onSelectedChange(option)}
            >
                {option.label}
            </div>
        );
    });

    // console.log(ref.current);

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{label}</label>
                <div
                    onClick={() => setOpen(!open)}
                    className={`ui selection dropdown ${open ? "visible active" : ""}`}
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? "visible transition" : ""}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;
