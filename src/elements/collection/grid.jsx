import React, {useCallback, useEffect, useState} from 'react';
import './grid.css';
import Contact from "../contact/Contact";

const Grid = () => {
    const numElements = 100; // Number of elements in the grid

    // Generate an array of numbers from 1 to numElements
    const elements = Array.from({ length: numElements }, (_, index) => index + 1);

    const [show, setShow] = useState(false);
    const [element, setElement] = useState(null);
    const [height, setHeight] = useState(null);
    const [columns, setColumns] = useState(1);

    const showModal = (element) => {
        setShow(true);
        setElement(element);
        console.log(element);
        console.log(show);
    }

    const onClose = () => {
        setShow(false);
        setElement(null);
    }

    useEffect(() => {
        setHeight(window.innerHeight);
        setColumns(window.innerHeight/250);
    }, [window.innerHeight]);


    return (
        <div className="grid-container" >
            {elements.map((element) => (
                <div onClick={()=> showModal(element)} key={element} className="grid-item">
                    {element}
                </div>
            ))}
            <GridModal onClose={() => onClose()} show={show} element={element}/>
            <p>{height}</p>
        </div>
    );
};

export default Grid;

const GridModal = props => {
    if (!props.show) {
        return null;
    }

    return (
        <div className="grid-modal" onClick={props.onClose}>
            <div className="grid-modal-content" onClick={e => e.stopPropagation()}>
                <span className="close grid-modal-close modal-button grid-modal-button" onClick={props.onClose}>&times;</span>
                <p>{props.element}</p>
                <p>Some text in the Modal..</p>
                <div className="grid-modal-contact" onClick={e => e.stopPropagation()}>
                    <Contact/>
                </div>
            </div>
        </div>
    );
}