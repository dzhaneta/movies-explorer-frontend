import React, { useState } from "react";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import Student from "../Student/Student";

function Main({ loggedIn }) {

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
                loggedIn={loggedIn}
                onSideBarOpen={handleOpenSideBarMenu}
            />

            <main className="main">
                
                <Promo />

                <div className="content">

                    <AboutProject />

                    <Techs />

                    <Student />

                </div>
                
            </main>
            
            <Footer />

            <SideBarMenu
                isOpen={isSideBarOpen}
                onClose={handleCloseSideBarMenu}
            />
        </>
    );

}

export default Main;