import React from 'react';
import img from '../../../media/40.jpg';

const Cart2 = () => {
    return (
        <div className="cart">
            <div className="top">
                <h1 className="width-full title">Mer informasjon</h1>
                <h3>Undertittel</h3>
            </div>
            <div className="bottom">
                <div className="width-half left">
                    <img className="right" src={img}/>

                </div>
                <div className="width-half right">
                    <p className="width-half left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc eget ultricies ultricies, nunc nisl ultricies nunc, vitae ultricie
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc eget ultricies ultricies, nunc nisl ultricies nunc, vitae ultricieLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc eget ultricies ultricies, nunc nisl ultricies nunc, vitae ultricieLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc eget ultricies ultricies, nunc nisl ultricies nunc, vitae ultricieLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc eget ultricies ultricies, nunc nisl ultricies nunc, vitae ultricieLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc eget ultricies ultricies, nunc nisl ultricies nunc, vitae ultricie</p>

                </div>
            </div>
        </div>
    );
};
export default Cart2;
