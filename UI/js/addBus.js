let rowNum = 0;
document.addEventListener('DOMContentLoaded', () => {

})


const normalRow = () => {
    const mainRow = document.createElement('div');
    mainRow.className = 'normal-row';
    const seatLeft = seats();
    const seatRight = seats();

    const row_number = document.createElement('p');
    row_number.innerHTML = rowNum + 1;
    rowNum += 1;


    mainRow.appendChild(row_number);
    mainRow.appendChild(seatLeft);
    mainRow.appendChild(seatRight);
    mainRow.appendChild(deleteButton());

    console.log(mainRow);
    return mainRow;
}

const seats = () => {
    const seatColumn = document.createElement('div');
    seatColumn.setAttribute('class', 'seat-column');

    const seatRow = document.createElement('div')
    seatRow.setAttribute('class', 'seats');

    const seatImg = document.createElement('img');
    seatImg.setAttribute('src', "../assets/images/seat.png");

    const seatImg2 = document.createElement('img');
    seatImg2.setAttribute('src', "../assets/images/seat.png");

    const seat = document.createElement('div')
    seat.setAttribute('class', 'seat');

    const seat2 = document.createElement('div')
    seat2.setAttribute('class', 'seat');


    seat.appendChild(seatImg);
    seat2.appendChild(seatImg2);

    seatRow.appendChild(seat);
    seatRow.appendChild(seat2);

    seatColumn.appendChild(seatRow)

    return seatColumn;
}


const backRow = () => {
    const row = document.createElement('div');
    row.className = 'back-row';

    const seatRow = document.createElement('div');
    seatRow.setAttribute('class', 'seats');

    const seatImg = document.createElement('img');
    seatImg.setAttribute('src', "../assets/images/seat.png");

    const seatImg2 = document.createElement('img');
    seatImg2.setAttribute('src', "../assets/images/seat.png");
    const seatImg3 = document.createElement('img');
    seatImg3.setAttribute('src', "../assets/images/seat.png");

    const seatImg4 = document.createElement('img');
    seatImg4.setAttribute('src', "../assets/images/seat.png");

    const seatImg5 = document.createElement('img');
    seatImg5.setAttribute('src', "../assets/images/seat.png");

    const seat = document.createElement('div')
    seat.setAttribute('class', 'seat');

    seat.appendChild(seatImg);

    const seat2 = document.createElement('div')
    seat2.setAttribute('class', 'seat');
    seat2.appendChild(seatImg2);

    const seat3 = document.createElement('div')
    seat3.setAttribute('class', 'seat');
    seat3.appendChild(seatImg3);


    const seat4 = document.createElement('div')
    seat4.setAttribute('class', 'seat');
    seat4.appendChild(seatImg4);

    const seat5 = document.createElement('div')
    seat5.setAttribute('class', 'seat');
    seat5.appendChild(seatImg5);

    seatRow.appendChild(seat);
    seatRow.appendChild(seat2);
    seatRow.appendChild(seat3);
    seatRow.appendChild(seat4);
    seatRow.appendChild(seat5);


    row.appendChild(seatRow)
    row.appendChild(deleteButton())

    return row;
}

const addRow = () => {
    document.querySelector('#rows').appendChild(normalRow())
}

const addBackRow = () => {
    document.querySelector('#rows').appendChild(backRow());
}

document.querySelector('#addNormalRow').addEventListener('click', (e) => {
    e.preventDefault();
    addRow();
});
document.querySelector('#addBackRow').addEventListener('click', (e) => {
    e.preventDefault();
    addBackRow();
});
