import React, { useState } from "react";
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import SideBarMenu from '../SideBarMenu/SideBarMenu';
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";

function Main() {

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

            <main className="main">
                
                <Promo />

                <div className="content">

                    <AboutProject />

                    <section className="techs"></section>

                    <section className="student">
                        <section className="about-me"></section>
                        <section className="portfolio"></section>
                    </section>
                    

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