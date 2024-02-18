import React, {useEffect} from 'react';
import oversikt from "./Oversikt.json";
import './SimpleCss.css';
import Contact from "../../elements/contact/Contact";
import ImageService from "../../elements/image/imageService";
import FullImage from "../../elements/image/flipImage";


import { useRef } from 'react';

const safeDocument = typeof document !== 'undefined' ? document : {};
const SimpleGrid = () => {
    const [collection, setCollection] = React.useState(oversikt.web);
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
    const scrollBlocked = useRef();
    const html = safeDocument.documentElement;
    const { body } = safeDocument;


    const showModal = (element, page) => {
        setPage(page);
        setElement(element);
        setShow(true);
        if (!body || !body.style || scrollBlocked.current) return;

        const scrollBarWidth = window.innerWidth - html.clientWidth;
        const bodyPaddingRight =
            parseInt(window.getComputedStyle(body).getPropertyValue("padding-right")) || 0;

        html.style.position = 'relative'; /* [1] */
        html.style.overflow = 'hidden'; /* [2] */
        body.style.position = 'relative'; /* [1] */
        body.style.overflow = 'hidden'; /* [2] */
        body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

        scrollBlocked.current = true;
    }
    const onClose = () => {
        setShow(false);
        setPage(0);
        if (!body || !body.style || !scrollBlocked.current) return;

        html.style.position = '';
        html.style.overflow = '';
        body.style.position = '';
        body.style.overflow = '';
        body.style.paddingRight = '';

        scrollBlocked.current = false;
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
        <div className="grid-container-vertical" style={show?{}:{overflow:"hidden"}}>
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
            <h3>{props.props["Nummer"]}</h3>
            <p>{props.props["År"]}</p>
        </div>
    );

}


const Modal = props => {
    const [visibleField, setVisibleField] = React.useState("image");

    const onChangeVisibleField = (field) => {
        setVisibleField(field);
        console.log("VisibleField", visibleField);
    }

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

                    <div className={(visibleField==="image"?(""):("hide-mobile")) + " grid-modal-body-left content"} >
                        <FullImage imageName={props.element.Nummer}/>
                    </div>
                    <div className={(visibleField!=="image"?(""):("hide-mobile")) + " grid-modal-body-right content"}>
                        <RightContent element={props.element} display={visibleField}/>
                    </div>
                    <button className="next nav-button grid-modal-button modal-button" onClick={
                        (e) => {
                            e.preventDefault();
                            props.onNext();
                        }

                    }>&#8250;</button>
                </div>
                <div className="grid-modal-footer">
                    <button className="grid-modal-button modal-button-info-switch" onClick={()=>onChangeVisibleField("image")}>Se bilde</button>
                    <button className="grid-modal-button modal-button-info-switch" onClick={() => onChangeVisibleField("info")}>Se info</button>
                    <button className="grid-modal-button modal-button-info-switch" onClick={() => onChangeVisibleField("contact")}>Ta kontakt</button>

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

    return (
        <div className="grid-modal-right-content">
            <div className="grid-modal-right-content-body">
                <div className={props.display==="info"?(""):("hide-mobile") +" info"} style={{display: displayInfo?(""):("none")}}>
                    <h3>Info</h3>
                    <div className="inline">
                        <p>Nummer:</p>
                        <p>{props.element.Nummer}</p>
                    </div>
                    <div className="inline">
                        <p>Bokas navn:</p>
                        <p>{props.element["Bokas navn"]}</p>
                    </div>
                    <div className="inline">
                        <p>Trykket i:</p>
                        <p>{props.element["Trykket i"]}</p>
                    </div>
                    <div className="inline">
                        <p>Trykket av:</p>
                        <p>{props.element["Trykket av"]}</p>
                    </div>
                    <div className="inline">
                        <p>År:</p>
                        <p>{props.element.År}</p>
                    </div>
                    <div className="inline">
                        <p>Solgt:</p>
                        <p>{props.element["Solgt"]!==0 ? ("Nei"):("Ja")}</p>
                    </div>
                    <div className="inline">
                        <p>{props.element["Beskrivelse"]}</p>
                    </div>
                </div>
                <div className={props.display==="contact"?(""):("hide-mobile")} style={{display: displayInfo && props.display!=="contact"?("none"):("")}}>
                    <h3>Ta kontakt</h3>
                    <Contact className="grid-modal-contact" element={props.element}/>
                </div>
            </div>

            <div className="grid-modal-right-content-info-footer">
                <button className="grid-modal-button modal-button-info-switch hide-mobile" onClick={
                    (e) => {
                        e.preventDefault();
                        setDisplayInfo(!displayInfo);
                    }
                }>{displayInfo?("Ta kontakt"):("Se info")}</button>
            </div>
        </div>
    );

}