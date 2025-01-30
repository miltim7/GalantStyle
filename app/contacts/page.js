import Header from "@components/Header";
import UtilityBar from "@components/UtilityBar";
import Footer from "@components/Footer";
import ContactForm from "@components/ContactForm";
import '@styles/contacts.css';

export default function Contacts() {
    return <>
        <UtilityBar />
        <Header isTransparent={false} />
        <div className="contacts-div">
            <ContactForm />
        </div>
        <Footer />
    </>
}