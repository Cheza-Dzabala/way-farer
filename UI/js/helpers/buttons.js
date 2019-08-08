 const deleteButton = () => {
    del = document.createElement('button');
    del.setAttribute('class', 'btn')
    del.innerHTML = 'x';

    del.setAttribute('href', '#')
    del.setAttribute('class', 'delete')
    del.addEventListener('click', e => {
       e.target.parentElement.remove();
    });
    return del;
 }