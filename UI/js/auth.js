const validateLogin = (email, password) => {
    if (email == '')
    {
        return 'Email is required' ;
    }
    if(password == '')
    {
        return 'Password is required';
    }
}


loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const error = validateLogin(emailElement.value, passwordElement.value);
    if(error)
    {
        authMessageContainerElement.innerHTML += (message(error));
    }else{
        users.forEach(user => {
            if(user.email == emailElement.value && user.password == passwordElement.value)
            {
                const authUser = new User(user);
                localStorage.setItem('user', JSON.stringify(authUser));
                window.location.href = 'index.html'
            }
        });
        authMessageContainerElement.innerHTML += (message('Invalid Credentials'));
    }
});