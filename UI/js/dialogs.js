// Get the modal
var modal = document.getElementById("confirmationModal");

// Get the button that opens the modal
var btn = document.getElementById("cancel");

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


const handleClick = (action = null) => {
    modal.style.display = "none";
}