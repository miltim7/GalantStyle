"use client";
import React, { useState } from "react";
import { useInView } from 'react-intersection-observer';
import '@styles/contact-form.css';

export default function ContactForm() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [formState, setFormState] = useState({
        username: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/sendTelegramMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        });

        if (response.ok) {
            alert('Сообщение отправлено в Telegram!');
            setFormState({
                username: '',
                email: '',
                phone: '',
                message: ''
            });
        } else {
            alert('Ошибка при отправке сообщения');
        }
    };

    return (
        <section className={`contacts ${inView ? 'animate' : ''}`} ref={ref}>
            <h2>Свяжитесь с нами</h2>
            <span>Если у вас есть вопрос о нашей продукции, вам нужна помощь с заказом или вы просто хотите поделиться своим опытом рукоделия, мы всегда готовы помочь вам! Заполните форму ниже или отправьте нам письмо, и мы ответим вам как можно скорее.</span>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        name="username"
                        placeholder="Имя"
                        value={formState.username}
                        onChange={handleInputChange}
                    />
                    <input
                        name="email"
                        placeholder="Email"
                        value={formState.email}
                        onChange={handleInputChange}
                    />
                </div>
                <input
                    name="phone"
                    placeholder="Номер телефона (+994 50 552 92 10)"
                    value={formState.phone}
                    onChange={handleInputChange}
                />
                <textarea
                    name="message"
                    placeholder="Сообщение"
                    value={formState.message}
                    onChange={handleInputChange}
                />
                <button type="submit">Send</button>
            </form>
        </section>
    );
}
