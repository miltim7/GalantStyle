"use client";
import { useInView } from 'react-intersection-observer';
import '@styles/about.css';


export default function About() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className={`about ${inView ? 'animate' : ''}`} ref={ref}>
            <div className="about-content">
                <h2>О нас</h2>
                <p><strong>Добро пожаловать в Galant Style!</strong></p>
                <p>Galant Style - это ваш проводник в мир премиальной моды. Мы создаем пространство для тех, кто ценит качество, стиль и подлинность, предлагая оригинальные вещи от мировых брендов.</p>
                <p>Наша цель – сделать процесс покупки люксовой одежды удобным и прозрачным, чтобы каждый клиент мог легко заказать желаемый товар, не беспокоясь о его подлинности, доставке и сервисе.</p>
                <p>Мы тщательно подбираем ассортимент, сотрудничая с официальными магазинами и крупными международными платформами. В нашем каталоге представлены культовые бренды, среди которых Lacoste, Armani, Hugo Boss, Ralph Lauren, Moncler и многие другие.</p>
            </div>
        </section>
    );
}
