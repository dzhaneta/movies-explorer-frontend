import React, { useState } from "react";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import SideBarMenu from '../SideBarMenu/SideBarMenu';

function Main() {

    const [isSideBarMenuOpen, setSideBarMenuOpen] = useState(false);

    function handleOpenSideBarMenu() {
        setSideBarMenuOpen(true);
    }

    function handleCloseSideBarMenu() {
        setSideBarMenuOpen(true);
    }

    return (
        <>
            <Header />
            <main className="main"></main>
            <Footer />
            <SideBarMenu
                isOpen={isSideBarMenuOpen}
            />
        </>
    );

}

export default Main;