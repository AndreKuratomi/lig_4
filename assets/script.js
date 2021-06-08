const lig_4 = {
    player_1: '1',
    player_2: '2',
    matrix: null,
    make_matrix() {
        return [...Array(6)].map( _ => [...Array(7)].map(_ => ' '))
    },
    start() {
        this.matrix = this.make_matrix()
    }//,
    // column: {current: 0, function(){
    //     if column;
    // }
}


// André,

// Gabriel,



// Lucas


//André

//Funções que alterem a cor da seta de acordo com a do botão;
const seta = document.querySelector(div.fa-sort-down);
const button1 = document.querySelector(div.player__name--one);
const button2 = document.querySelector(div.player__name--two);

button1.addEventListener('click', () => {
    seta.style.color = 'darkGreen';
});

button2.addEventListener('click', () => {
    seta.style.color = 'green';
});


//Funções que alterem as posições da seta;

const button_area = document.querySelector(div.button_area);
let column = 0;

button_area.addEventListener('click', evt => {
    const evt_target = evt.target;
    if (evt_target.classList.contains('button--left')) {
        if (column > 0 && column <= 6) {
            column -= 1;
        }
    }
    if (evt_target.classList.contains('button--right')) {
        if (column >= 0 && column < 6) {
            column += 1;
        }
    }
    if (evt_target.classList.contains('button--down')) {
        
    }
});

//Mensagem de vitória:
const winner = player => {
    const victory = document.querySelector(body);
    const conquer = document.createElement('div');
    conquer.classList = 'invictu';
    conquer.innerHTML = `<span id="majestic">${player}</span> + " venceu!"`;
    victory.appendChild(conquer);

};

if () {
    setTimeout(winner(jogador1), 5000);
}
setTimeout(winner(jogador2), 5000);








//Gabriel









//Lucas


