import React, {useEffect} from 'react';
import samling from "./Samling.json";
import './SimpleCss.css';
import Contact from "../../elements/contact/Contact";
import ImageService from "../../elements/image/imageService";
import FullImage from "../../elements/image/flipImage";

const SimpleGrid = () => {
    const [collection, setCollection] = React.useState(samling.Publish);
    const [show, setShow] = React.useState(false);
    const [element, setElement] = React.useState({
        "Nummer": "0",
        "Date": "0",
        "Location": "0",
        "Capacity": "0",
        "Speakers": "0",
        "Solgt": "0"

    });
    const [page, setPage] = React.useState(0);

    const showModal = (element, page) => {
        setPage(page);
        setElement(element);
        setShow(true);
    }
    const onClose = () => {
        setShow(false);
        setPage(0);
    }
    const onNext = () => {
        console.log("Next");
        if (page < collection.length - 1) {
            showModal(collection[page + 1], page + 1);
        }else {
            showModal(collection[0], 0);
        }
    }
    const onPrevious = () => {
        console.log("Previous");
        if (page > 0) {
            showModal(collection[page - 1], page - 1);
        }
        else {
            showModal(collection[collection.length - 1], collection.length - 1);
        }

    }


    return (
        <div className="grid-container-vertical">
            {
                collection.map((row, i) => (
                    <Item key={i} index={i} props={row} showModal={showModal}/>
                ))
            }
            <Modal onClose={() => onClose()} show={show} element={element} onPrevious={onPrevious} onNext={onNext}/>
        </div>
    );
};

export default SimpleGrid;

const Item = props => {
    return (
        <div key={props.props.EventID} className="grid-item" onClick={
            (e) => {
                e.preventDefault();
                props.showModal(props.props, props.index)
            }
        }>
            <ImageService imageName={props.props["Nummer"]}/>
            <h3>Title: {props.props["Nummer"]}</h3>
            <p>Sub</p>
        </div>
    );

}


const Modal = props => {
    if (!props.show || props.element === null || props.element === undefined) {
        return null;
    }
    return (
        <div className="grid-modal" onClick={props.onClose}>
            <div className="grid-modal-content" onClick={e => e.stopPropagation()}>
                <div className="grid-modal-header">
                    <h1></h1>
                    <h2>{props.element.Nummer}</h2>
                    <span className="close grid-modal-close modal-button grid-modal-button" onClick={
                        (e) => {
                            e.preventDefault();
                            props.onClose();
                        }
                    }>&times;</span>
                </div>
                <div className="grid-modal-body">
                    <button className="prev nav-button grid-modal-button modal-button" onClick={
                        (e) => {
                            e.preventDefault();
                            props.onPrevious();
                        }
                    }>&#8249;</button>

                    <div className= "grid-modal-body-left content">
                        <FullImage imageName={props.element.Nummer}/>
                    </div>
                    <div className="grid-modal-body-right content">
                        <RightContent element={props.element}/>
                    </div>
                    <button className="next nav-button grid-modal-button modal-button" onClick={
                        (e) => {
                            e.preventDefault();
                            props.onNext();
                        }

                    }>&#8250;</button>
                </div>
                <div className="grid-modal-footer">
                    <button className="grid-modal-button modal-button-info-switch">Se bilde</button>
                    <button className="grid-modal-button modal-button-info-switch">Se info</button>
                    <button className="grid-modal-button modal-button-info-switch">Ta kontakt</button>

                </div>
            </div>
        </div>
    );
}

const salgsstatus = (solgt) => {
    if (solgt === undefined || solgt === null || solgt === "") {
        return "Tilgjengelig";
    }
    if (solgt.toUpperCase() === "JA") {
        return "I privat eie";
    } else {
        return "Tilgjengelig";
    }
}



const RightContent = (props) => {
    const [displayInfo, setDisplayInfo] = React.useState(true);
    console.log("RightContent", props);

    return (
        <div className="grid-modal-right-content">
            <div className="grid-modal-right-content-body">
                <div className="info" style={{display: displayInfo?(""):("none")}}>
                    <h3>Info</h3>
                    <div className="inline">
                        <p>Nummer:</p>
                        <p>{props.element.Nummer}</p>
                    </div>
                    <div className="inline">
                        <p>År:</p>
                        <p>{props.element.Bakside}</p>
                    </div>
                    <div className="inline">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus accusantium assumenda, blanditiis dicta eveniet facere fugiat incidunt itaque iure, mollitia nam natus nobis numquam odio reiciendis similique soluta sunt voluptas!</p>
                    </div>
                </div>
                <div style={{display: displayInfo?("none"):("")}}>
                    <h3>Ta kontakt</h3>
                    <Contact className="grid-modal-contact" element={props.element}/>
                </div>
            </div>

            <div className="grid-modal-right-content-info-footer">
                <button className="grid-modal-button modal-button-info-switch" onClick={
                    (e) => {
                        e.preventDefault();
                        setDisplayInfo(!displayInfo);
                    }
                }>{displayInfo?("Ta kontakt"):("Se info")}</button>
            </div>
        </div>
    );

}