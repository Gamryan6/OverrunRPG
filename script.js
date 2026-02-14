function toggleAuth() {
    document.getElementById('register-form').classList.toggle('hidden');
    document.getElementById('login-form').classList.toggle('hidden');
}

function register() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    
    if(!name || !email || !pass) return document.getElementById('reg-error').innerText = "Remplis tout !";
    if(localStorage.getItem(email)) return document.getElementById('reg-error').innerText = "Email déjà utilisé.";

    const user = { name, email, pass };
    localStorage.setItem(email, JSON.stringify(user));
    alert("Compte créé ! Connecte-toi.");
    toggleAuth();
}

function login() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;
    
    const stored = JSON.parse(localStorage.getItem(email));
    if(!stored || stored.pass !== pass) return document.getElementById('login-error').innerText = "Erreur email/password.";

    localStorage.setItem('session', JSON.stringify(stored));
    checkSession();
}

function checkSession() {
    const session = JSON.parse(localStorage.getItem('session'));
    const navBtn = document.getElementById('nav-btn');
    
    if(session) {
        if(navBtn) navBtn.innerText = "👤 " + session.name;
        if(document.getElementById('profile-box')) {
            document.getElementById('register-form').classList.add('hidden');
            document.getElementById('login-form').classList.add('hidden');
            document.getElementById('profile-box').classList.remove('hidden');
            document.getElementById('user-name').innerText = session.name;
            document.getElementById('user-email').innerText = session.email;
        }
    }
}

function logout() {
    localStorage.removeItem('session');
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', checkSession);