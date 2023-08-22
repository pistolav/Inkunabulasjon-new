import React, { useState, useEffect, useRef } from 'react';
import "./timeline.css"
import background from '../../media/timeline/europe.jpg';
import pin from '../../media/timeline/europe-1.png';
import pin1 from '../../media/timeline/europe-2.png';
import pin2 from '../../media/timeline/europe-3.png';




const Timeline = () => {
    const [start, setStart] = useState(1400);
    const [end, setEnd] = useState(1900);
    const [position, setPosition] = useState(0);
    const [image, setImage] = useState(null);

    const handleSetPosition = (pos) => {
        if (pos < 1450){
            setImage(`url(${background})`)
        }else if (pos < 1650){
            setImage(`url(${pin}), url(${background})`)
        }else if (pos < 1750){
            setImage(`url(${pin1}), url(${pin}), url(${background})`)
        }else if (pos < 1850){
            setImage(`url(${pin2}), url(${pin1}), url(${pin}), url(${background})`)
        }
        setPosition(pos);
    }



    var style = {
        backgroundImage: image,

    }

    return (
        <div className="timeline-content" style={style}>
            <Slider start={start} end={end} position={position} setPosition={handleSetPosition}/>
            <ImageOverlay number={position} />
        </div>
    );
}
export default Timeline;


const Slider = props => {
    const [value, setValue] = useState(0);
    const start = props.start;
    const end = props.end;
    const setPosition = props.setPosition;
    const sliderRef = useRef(null);
    const isDragging = useRef(false);

    const handleMouseDown = () => {
        isDragging.current = true;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = event => {
        if (isDragging.current) {
            const sliderRect = sliderRef.current.getBoundingClientRect();
            const position = event.clientX - sliderRect.left;
            const range = sliderRect.right - sliderRect.left;
            const newValue = Math.round((position / range) * 100);
            if (newValue < start || newValue > end) {
                return;
            }
            setValue(newValue);
            setPosition(newValue);
        }
    };

    useEffect(() => {
        const handleMouseLeave = () => {
            isDragging.current = false;
        };

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="slidecontainer">
            <input className="slider"
                type="range"
                min={start}
                max={end}
                value={value}
                onChange={event => {
                    setValue(event.target.value)
                    setPosition(event.target.value)
                }}
                className="slider"
                ref={sliderRef}
                onMouseDown={handleMouseDown}
            />
            <p>val: {value}</p>
        </div>
    );
};

const ImageOverlay = ({ number }) => {

    const getImageUrl = () => {
        // Replace these image URLs with your own
        if (number <= 25) {
            return 'https://example.com/image1.jpg';
        } else if (number <= 50) {
            return 'https://example.com/image2.jpg';
        } else if (number <= 75) {
            return 'https://example.com/image3.jpg';
        } else {
            return 'https://example.com/image4.jpg';
        }
    };



    return (
        <div className="timeline_images">

        </div>
    );
};

const RandomPoints = ({ numPoints }) => {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        const generatePoints = () => {
            const newPoints = [];
            for (let i = 0; i < numPoints; i++) {
                const x = Math.random() * 1980; // Random x coordinate (adjust as needed)
                const y = Math.random() * 1000; // Random y coordinate (adjust as needed)
                newPoints.push({ x, y });
            }
            setPoints(newPoints);
        };

        generatePoints();
    }, [numPoints]);

    return (
        <div style={{ position: 'relative', width: '100vw', height: '70vh', border: '1px solid black' }}>
            {points.map((point, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        left: `${point.x}px`,
                        top: `${point.y}px`,
                        width: '5px',
                        height: '5px',
                        background: 'black',
                    }}
                />
            ))}
        </div>
    );
};

