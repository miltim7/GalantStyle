"use client";
import { FaTiktok, FaInstagram, FaTelegram, FaPhone, FaEnvelope } from "react-icons/fa";
import '@styles/footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links-center">
                    <a href="/">Главная</a>
                    <a href="/clothes">Магазин</a>
                    <a href="/contacts">Контакты</a>
                </div>
                <div className="footer-contact-social">
                    <div className="footer-contact">
                        <a href="tel:+994505529210"><FaPhone /> +994 50 552 92 10</a>
                        <a href="mailto:galant.style7@gmail.com"><FaEnvelope /> galant.style7@gmail.com</a>
                    </div>
                    <div className="footer-social">
                        <a href="https://www.tiktok.com/@galantstyle.az?_t=ZS-8tLLAbHBA7L&_r=1" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
                        <a href="https://www.instagram.com/galantstyle.az?igsh=bHdicXE1MW9sMm4y" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://t.me/miltim7" target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
                    </div>
                </div>
                <div className="footer-more-info">
                    <a href="/delivery">Доставка и оплата</a>
                    <a href="/quarantee">Гарантия и возврат</a>
                    <a href="/policy">Политика конфиденциальности</a>
                </div>
                <div className="footer-copyright">
                    <p>© 2025, Galant Style</p>
                </div>
            </div>
        </footer>
    );
}
