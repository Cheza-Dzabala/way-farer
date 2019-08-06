
const setUpPage = () => {
    console.log(window.location.href);
    const rawUser = localStorage.getItem('user');
    if(rawUser)
    {
        const user = JSON.parse(rawUser);
        linkSignupElement.remove();
        linkSigninElement.remove();
        welcomeMessageElement.innerHTML += `> ${user.first_name} ${user.last_name}`
        if(!user.is_admin) linkAdminElement.remove();
    }else{
        linkLogoutElement.remove();
        linkAccountElement.remove();
        linkAdminElement.remove();
    }
}

const logout = () => {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}


//Set Up DOM Listener
document.addEventListener('DOMContentLoaded', setUpPage);