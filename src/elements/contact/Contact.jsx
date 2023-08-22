import React, {useState} from 'react';
import './contact.css';
import emailjs from 'emailjs-com';
import {init} from "emailjs-com";
init("5ewBIm4qQExPahOYi");

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [phone, setPhone] = useState("");
    const [additional, setAdditional] = useState("");

    const submit = () => {
        if (name && email && message && isValidEmail(email)) {
            const serviceId = "service_ui43leq";
            const templateId = "template_jj8e0th";
            const p_key = "5ewBIm4qQExPahOYi";
            const templateParams = {
                from_name: name,
                reply_to: email,
                message: message,
                from_phone: phone,
                custom_value: additional,
                ref_info: "Generelt",
            }
            emailjs.send(serviceId, templateId, templateParams, p_key)
                .then(r => console.log(r))
                .then(e => console.log(e));

            setMessage('');
            setEmailSent(true);
        } else {
            alert('Venligst fyll ut alle de nødvendige feltene');
        }
    }
    const isValidEmail = email => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    };

    return (
        <div className="contact-form" id="contact form">
            <input type="text" placeholder="Navn" value={name} onChange={event => {setName(event.target.value)}}/>
            <input type="text" placeholder="E-post" value={email} onChange={event => {setEmail(event.target.value)}}/>
            <input type="text" placeholder="Telefon" value={phone} onChange={event => {setPhone(event.target.value)}}/>
            <textarea placeholder="Melding" value={message} onChange={event => {setMessage(event.target.value)}}/>
            <textarea placeholder="Tilleggsinformasjon" value={additional} onChange={event => {setAdditional(event.target.value)}}/>
            <button onClick={submit}>Send</button>
            <span>{emailSent ? "E-post sendt" : ""}</span>
        </div>
    );
};

export default Contact;
