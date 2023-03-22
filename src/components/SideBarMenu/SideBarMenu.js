import React from "react";
import Navigation from "../Navigation/Navigation";
import UserTab from "../UserTab/UserTab";

function SideBarMenu({ isOpen, onClose }) {
    // functionality

    return (
        <div 
            className={`
                sidebar
                ${isOpen && 'sidebar_open'}
            `}
        >
            <button
                className="sidebar__close-button"
                onClick={onClose}>
            </button>

            <Navigation vertical />

            <UserTab vertical />

        </div>
    );

}

export default SideBarMenu;