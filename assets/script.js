const lig_4 = {
    player_1: '1',
    player_2: '2',
    column: 3,
    matrix: {
        path: null,
        start() {
            this.path = [...Array(6)].map( _ => [...Array(7)].map( _ => ' '))
        }
    },
    start() {
        this.matrix.start()
        this.animations.start()
        this.disks.start()
        this.input.start()
        this.controller.start()
    },
// André,
    controller: {
        start() {
            const button_area = document.querySelector('div.button_area')
            const seta = document.querySelector('i.fa-chevron-down')

            button_area.addEventListener('click', evt => {
                const evt_target = evt.target;
                let flag = false;
                
                if (evt_target.classList.contains('button--left')) {
                    if (lig_4.column > 0) {
                        lig_4.column -= 1;
                        flag = true;
                    }
                }
                if (evt_target.classList.contains('button--right')) {
                    if (lig_4.column < 6) {
                        lig_4.column += 1;
                        flag = true;
                    }
                }
                if (evt_target.classList.contains('button--down')) {
                    seta.classList.toggle('fa-chevron-down-color2');
                }
                if (flag) {
                    this.render(seta);
                }
            })
        },
        render(seta) {
            seta.style.left = `${lig_4.column * 50}px`;
        }
    },
// Gabriel,
    input: {
        get_names() {
            const inputNames = document.getElementById('inputNames');
            const submit = document.getElementById('submit');

            submit.addEventListener('click', function(){
                const jogadorUm = document.getElementById('inputUm').value;
                const jogadorDois = document.getElementById('inputDois').value;
                const playernameOne = document.querySelector('div.player__name--one');
                const playernameTwo = document.querySelector('div.player__name--two');
                const container = document.querySelector("div.container");

                playernameOne.innerText = jogadorUm;
                playernameTwo.innerText = jogadorDois;
                inputNames.classList.add('hidden');
                container.classList.remove('hidden');
            })
        },
        start() {
            this.get_names()
        }
    },
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

//Mensagem de vitória:

// const winner = (player, classList) => {
//     const victory = document.querySelector('body');
//     const conquer = document.createElement('div');
//     conquer.classList = 'invictus';
//     conquer.classList.add(classList);
//     conquer.innerHTML = `${player} venceu!`;
//     victory.appendChild(conquer);
// };

// if ('lorem ipsum dolor') {
//     setTimeout(() => { winner(jogadorUm, 'invictu1'); }, 5000);
// }

// setTimeout(() => { winner(jogadorUm, 'invictu1'); }, 5000);


lig_4.start()

//Gabriel



//Lucas
