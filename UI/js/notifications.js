const message = (message) => `<div class="error-message">
<div class="message">
    ${message}
</div>
<div class="cancel-message" id="cancel-message" onclick="hideMessage()">
    [close]
</div>
</div>`

const hideMessage = () => {
    const message =  document.querySelector('.error-message');
    message.remove();
}
