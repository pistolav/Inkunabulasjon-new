import React from 'react';
import error from "./images/Default.jpg";

function ImageService({imageName, side="front"}) {
    let string = imageName;
    if (side === "back") {
        string+= "_2";
    }else {
        string+= "_1";
    }

    try {
        const image = require("./images/Frilagt_Inkunabula_" + string + ".png");
        return (
            <div className="image">
                <img src={image} alt={error} />
            </div>
        );
    }catch (e) {
        console.log("Error dor image", string);
        return (
            <div className="image">
                <img src={error} alt={error} />
            </div>
        );
    }

};

export default ImageService;