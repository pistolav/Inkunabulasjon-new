import React from "react";
import scan from "../../media/Scan.png";
import image from "../../media/ScanOptim.png";
import "./flipImage.css";
import ImageService from "./imageService";

const FullImage = (info) => {
    const [flipped, setFlipped] = React.useState(false);
    return(
        <div className="grid-modal-image top-container" onClick={
            (e) => {
                e.preventDefault();
                setFlipped(!flipped);
            }
        }>
            <div className="grid-modal-image-container two-container" style={
                {
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }
            }>
                <div className="grid-modal-image-front">
                    <ImageService imageName={info.imageName} side="front"/>
                </div>
                <div className="grid-modal-image-back">
                    <ImageService imageName={info.imageName} side="back"/>
                </div>
            </div>
        </div>
    )
}
export default FullImage;