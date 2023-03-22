import React, { useState } from "react";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import SideBarMenu from '../SideBarMenu/SideBarMenu';

function SavedMovies() {

    const [isSideBarOpen, setSideBarOpen] = useState(false);

    function handleOpenSideBarMenu() {
        setSideBarOpen(true);
    }

    function handleCloseSideBarMenu() {
        setSideBarOpen(false);
    }

    return (
        <>
            <Header 
                onSideBarOpen={handleOpenSideBarMenu}
            />

            <main className="saved-movies"></main>
            
            <Footer />
            
            <SideBarMenu
                isOpen={isSideBarOpen}
                onClose={handleCloseSideBarMenu}
            />
        </>
    );

}

export default SavedMovies;