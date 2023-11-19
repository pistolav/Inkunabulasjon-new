import React, {useEffect, useMemo, useRef, useState} from 'react';
import Logo from "../elements/logo";
import Info from "../sections/info";
import '../App.css';
import Collection from "../sections/collection";
import Timeline from "../sections/timeline";
import ContactSec from "../sections/contact";
import Navbar from "../elements/navbar/Navbar";



const Home = () => {
    const infoRef = useRef(null);
    const collectionRef = useRef(null);
    const timelineRef = useRef(null);
    const contactRef = useRef(null);

    const isInViewInfo = useIsInView(infoRef);
    const isInViewCollection = useIsInView(collectionRef);
    const isInViewTimeline = useIsInView(timelineRef);
    const isInViewContact = useIsInView(contactRef);

    const [active, setActive] = useState(1);


    useEffect(() => {
        const anchor = window.location.hash.slice(1);
        if (anchor) {
            const anchorEl = document.getElementById(anchor);
            if (anchorEl) {
                anchorEl.scrollIntoView();
            }
        }
    }, []);

    function useIsInView(ref) {
        const [isIntersecting, setIsIntersecting] = useState(false);

        const observer = useMemo(
            () =>
                new IntersectionObserver(([entry]) =>
                    setIsIntersecting(entry.isIntersecting),
                ),
            [],
        );

        useEffect(() => {
            observer.observe(ref.current);

            return () => {
                observer.disconnect();
            };
        }, [ref, observer]);

        return isIntersecting;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function inView() {
        if (isInViewInfo) {
            setActive(1);
        }
        if (isInViewCollection) {
            setActive(2)
        }
        if (isInViewTimeline) {
            setActive(3);
        }
        if (isInViewContact) {
            setActive(4);
        }
    }

    useEffect(() => {
        inView()
    }, [isInViewInfo, isInViewCollection, isInViewTimeline, isInViewContact, inView]);


    return (
        <div className="home app">
            <Logo/>
           <Navbar active={active}/>
            <section id="" ref={infoRef}>
                <Info/>
            </section>
            <section id="2" ref={collectionRef}>
                <Collection/>
            </section>
            <section id="3" ref={timelineRef}>
                <Timeline/>
            </section>
            <section id="4" ref={contactRef}>
                <ContactSec/>
            </section>
        </div>
    );
};

export default Home;
