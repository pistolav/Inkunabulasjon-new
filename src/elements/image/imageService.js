import React from 'react';
import error from "./images/Default.jpg";

function ImageService({imageName, side="front"}) {
    let string = imageName;
    if (side === "back") {
        string+= "_2";
    }else {
        string+= "_1";
    }
    console.log("ImageService", "./images/Frilagt_Inkunabula_"+ string+ ".png");

    try {
        const image = require("./images/Frilagt_Inkunabula_" + string + ".png");
        return (
            <div className="image">
                <img src={image} alt={error} />
            </div>
        );
    }catch (e) {
        return (
            <div className="image">
                <img src={error} alt={error} />
            </div>
        );
    }

};

export default ImageService;