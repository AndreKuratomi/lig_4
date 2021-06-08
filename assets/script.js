const lig_4 = {
    player_1: '1',
    player_2: '2',
    matrix: null,
    make_matrix() {
        return [...Array(6)].map( _ => [...Array(7)].map( _ => ' '))
    },
    start() {
        this.matrix = this.make_matrix()
<<<<<<< HEAD
    }//,
    // column: {current: 0, function(){
    //     if column;
    // }
}


// André,

// Gabriel,



// Lucas
=======
        this.animations.start()
        this.disks.start()
    },

// André,




// Gabriel,
>>>>>>> 3ac6dc3bd57e88984a430fee541ee8fbeac5592f



<<<<<<< HEAD
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

=======
// Lucas
>>>>>>> 3ac6dc3bd57e88984a430fee541ee8fbeac5592f

    animations: {
        buttons: {
            start() {
                const buton_area = document.querySelector('div.button_area')

                buton_area.addEventListener('click', evt => {
                    const evt_target = evt.target

                    // Animate down
                    if (evt_target.classList.contains('button--down')) {
                        evt_target.classList.add('animate--down')
                        setTimeout( _ => evt_target.classList.remove('animate--down'), 300)
                    }

                    // Animate left
                    else if (evt_target.classList.contains('button--left')) {
                        evt_target.classList.add('animate--left')
                        setTimeout( _ => evt_target.classList.remove('animate--left'), 300)
                    }

                    // Animate right
                    else if (evt_target.classList.contains('button--right')) {
                        evt_target.classList.add('animate--right')
                        setTimeout( _ => evt_target.classList.remove('animate--right'), 300)
                    }
                })
            }
        },
        start() {
            this.buttons.start()
        }
    },
    disks: {
        start() {
            const columns = [...document.querySelectorAll('div.game__col')]
            
            columns.forEach( (col, i) => {
                const container = document.createElement('div')
                const index = document.createElement('p')

                index.innerText = i + 1
                container.appendChild(index)
                container.classList.add('blank_container')
                for (let j = 0; j < 6; j++) {
                    const el = document.createElement('div')

                    el.classList.add('disk--blank')
                    container.appendChild(el)
                }
                col.appendChild(container)
            })
        }
    }
}



//André






//Gabriel

let inputNames = document.getElementById('inputNames');
const submit = document.getElementById('submit');

submit.addEventListener('click', function(){
    console.log('teste');
    let jogadorUm = document.getElementById('inputUm').value;
    let jogadorDois = document.getElementById('inputDois').value;
    let playernameOne = document.querySelector('div.player__name--one');
    let playernameTwo = document.querySelector('div.player__name--two');
    playernameOne.innerText = jogadorUm;
    playernameTwo.innerText = jogadorDois;
    inputNames.classList.add('hidden');
    let container = document.querySelector("div.container");
    container.classList.remove('hidden');
    
});



//Lucas
