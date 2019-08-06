const verifyAdmin = () => {
    const user = localStorage.getItem('user');
    if(user) {
        const parsed = JSON.parse(user);
        if(parsed.is_admin == false) {
            window.location.href = 'forbidden.html';
        }
    }else{
        window.location.href = 'forbidden.html';
    }
}
document.addEventListener('DOMContentLoaded', verifyAdmin);