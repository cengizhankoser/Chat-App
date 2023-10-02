document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            // Kullanıcıyı MongoDB'ye kaydetmek için bir POST isteği gönderin
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
                // Kullanıcıyı giriş sayfasına yönlendirin
                window.location.href = '/login.html';
            } else {
                alert('Kayıt sırasında bir hata oluştu.');
            }
        } catch (error) {
            console.error('Hata:', error);
        }
    });
});
