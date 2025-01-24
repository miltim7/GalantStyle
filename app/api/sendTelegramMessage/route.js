export async function POST(request) {
    const { username, email, phone, message } = await request.json();

    const telegramToken = '8107125555:AAGiXuZ2zYa2GB0e4b24Ucfb-4VtKNlrAmg';
    const chatId = '1454681697'; // Ваш Telegram User ID
    const text = `Новое сообщение от ${username}:\n\nИмя: ${username}\nEmail: ${email}\nТелефон: ${phone}\n\nСообщение:\n${message}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
            }),
        });

        if (!response.ok) {
            throw new Error('Ошибка при отправке сообщения в Telegram');
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Ошибка при отправке сообщения в Telegram:', error);
        return new Response(JSON.stringify({ error: 'Ошибка при отправке сообщения в Telegram' }), { status: 500 });
    }
}
