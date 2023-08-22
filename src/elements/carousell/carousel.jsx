import React, {useEffect, useRef, useState} from 'react';
import './carousel.css';
import Cart1 from "./carts/cart1";
import Cart2 from "./carts/cart2";
import img from "../../media/40.jpg";

const Carousel = () => {

        const [scrollPos, setScrollPos] = useState(0);
        const [num, setNum] = useState(0);
        const [width, setWidth] = useState(null);
        const carouselRef  = useRef(null);

        const carts = [
            <Cart1/>,
            <Cart2/>,
            <Cart2/>,
        ]
        const handleScroll = () => {
            const position = window.scrollX;
            setScrollPos(position);
        };
        const next = () => {
            if (num === Object.keys(carts).length-1){
                setNum(0);
                start();
            }else {
                fade(num, (num+1));
                carouselRef.current.scrollLeft += width;
                setNum(num+1);
            }
        }
        const prev = () => {
            if (num === 0){
                setNum(Object.keys(carts).length-1);
                end();
            }else {
                fade(num, (num-1));
                carouselRef.current.scrollLeft -= width;
                setNum(num-1);
            }
        }
        const start = () => {
            fade(num, 0);
            carouselRef.current.scrollLeft = 0;
        }

        const end = () => {
            fade(num, (Object.keys(carts).length-1));
            carouselRef.current.scrollLeft = carouselRef.current.scrollWidth;
        }


        const fade = (fadeOut, fadeIn) => {
            let cart = document.getElementById(fadeIn +'cart');
            let cart2 = document.getElementById(fadeOut +'cart');
            cart.style.opacity = "1";
            cart2.style.opacity = "0";
        }

        useEffect(() => {
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);

        useEffect(() => {
            setWidth(carouselRef.current.offsetWidth);
        }, [carouselRef]);

        useEffect(() => {
            function handleResize() {
                setWidth(carouselRef.current.offsetWidth);
            }
            window.addEventListener('resize', handleResize);

            handleResize();

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);

        return (

            <div className="scroll-fade-container" ref={carouselRef}>
                {carts.map((cart, index) => {
                    return (
                        <div id={index+"cart"} className="scroll-fade-item" style={{ transform: `translateX(-${scrollPos}px)`}}>
                            {cart}
                        </div>
                    )
                })}
                <div className="carousel__controls">
                    <div className="dot__container">
                        <DotRow active={num} amount={carts.length}/>
                    </div>
                    <button className="btn btn-primary" onClick={prev}><i className="fa fa-solid fa-caret-left"></i></button>
                    <Countdown running={true} time={20} action={next} restart={start}/>
                    <button className="btn btn-primary" onClick={next}><i className="fa fa-solid fa-caret-right"></i></button>
                </div>
            </div>
        );
};

export default Carousel;

const Countdown = ({running = true, time=10, action = () => {}, restart = () => {}}) => {
    const [countdown, setCountdown] = useState(time);
    const [isRunning, setIsRunning] = useState(running);

    useEffect(() => {
        let timerId;

        if (isRunning && countdown > 0) {
            timerId = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        }else if(isRunning && countdown === 0){
            setCountdown(time)
            action();
        }

        return () => {
            clearInterval(timerId);
        };
    }, [isRunning, countdown]);

    const handleToggle = () => {
        setIsRunning((prevState) => !prevState);
    };


    return (
        <div>
            <button onClick={handleToggle}>{isRunning ? (<i className="fa fa-solid fa-pause"></i>) : (<i className="fa fa-solid fa-play"></i>)}</button>
        </div>
    );
};

const DotRow = ({amount, active}) =>{
    const dots =  Array.from({ length: amount }, (_, index) => (
        <div key={index} className={active===index?("dot dot_active"):("dot")}></div>
    ));

    return(
      <div className="dot-row">
          {dots}
      </div>
    );
};

