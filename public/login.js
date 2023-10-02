document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            // Kullanıcıyı MongoDB veritabanında arayın
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                alert('Giriş başarılı!');
                window.location.href = '/index.html'; // Ana sayfanın URL'sini belirtin
            } else {
                alert('Giriş başarısız. Kullanıcı adı veya şifre hatalı.');
            }
        } catch (error) {
            console.error('Hata:', error);
        }
    });
});
