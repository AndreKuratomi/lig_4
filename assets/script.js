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
                    if (lig_4.disks.new_disk()) {
                        seta.classList.toggle('fa-chevron-down-color2');
                    }
                    lig_4.verify()
                }
                if (flag) {
                    this.render(seta)
                }
            })
        },
        render(seta) {
            seta.style.left = `${lig_4.column * 50}px`;
        }
    },
// Gabriel,
input: {
    error_id: null,
    get_names() {
        const inputNames = document.getElementById('inputNames');
        const submit = document.getElementById('submit');

        submit.addEventListener('click', function(){
            const jogadorUm = document.getElementById('inputUm').value;
            const jogadorDois = document.getElementById('inputDois').value;

            if (
                jogadorUm.trim() !== '' 
                && 
                jogadorDois.trim() !== ''
                &&
                jogadorUm.trim() !== jogadorDois.trim()) {    
                const playernameOne = document.querySelector('div.player__name--one');
                const playernameTwo = document.querySelector('div.player__name--two');
                const container = document.querySelector("div.container");
                const reset_button = document.querySelector('button.reset__button')

                playernameOne.innerText = jogadorUm;
                playernameTwo.innerText = jogadorDois;
                inputNames.classList.add('hidden');
                container.classList.remove('hidden');
                reset_button.classList.remove('hidden')

            } else {
                const error = document.querySelector('p.input__error_msg')

                error.classList.remove('input__error_msg-hidden')
                clearTimeout(this.error_id)
                this.error_id = setTimeout( _ => error.classList.add('input__error_msg-hidden'), 2500)
            }
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
                col.innerHTML = ''
                col.appendChild(container)
            })
        },
        new_disk() {
            const col = document.querySelector(`div#col_${lig_4.column}`)
            const seta = document.querySelector('i.fa-chevron-down')
            let x_axis = 0

            if (col.children.length < 6 + 1) {
                const disk = document.createElement('div')
                let cur_player = '1'

                disk.classList.add('player__disk')
                if (seta.classList.contains('fa-chevron-down-color2')) {
                    disk.classList.add('player__disk--two')
                    cur_player = '2'
                }
                col.appendChild(disk)
                
                while (x_axis < 6) {
                    if (lig_4.matrix.path[x_axis][lig_4.column] !== ' ') break
                    x_axis++
                }
                lig_4.matrix.path[--x_axis][lig_4.column] = cur_player
                console.table(lig_4.matrix.path)

                return true
            }

            return false
        }
    },
    verify() {    
        let array = lig_4.matrix.path
        let won = false;
        // Horizontal
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length - 3; j++) {
                if (array[i][j] !== " "
                    &&
                    array[i][j] === array[i][j+1]
                    &&
                    array[i][j] === array[i][j+2]
                    &&
                    array[i][j] === array[i][j+3]){
                    won = true;
                    if(array[i][j] === '1') {
                        // setTimeout(() => { winner(jogadorUm, 'invictu1'); }, 5000);
                        console.log('Jogador 1')
                    }
                    else {
                        // setTimeout(() => { winner(jogadorDois, 'invictu2'); }, 5000);
                        console.log('Jogador 2')
                    }
                }
            }
        }
        // Vertical
        for (let i = 0; i < array.length - 2; i++) {            
            for (let j = 0; j < array[i].length; j++) {
                if (array[i][j] !== " "
                    &&
                    array[i][j] === array[i+1][j]
                    &&
                    array[i][j] === array[i+2][j]
                    &&
                    array[i][j] === array[i+3][j]){
                    won = true;
                    if(array[i][j] === '1') {
                        // setTimeout(() => { winner(jogadorUm, 'invictu1'); }, 5000);
                        console.log('Jogador 1')
                    }
                    else {
                        // setTimeout(() => { winner(jogadorDois, 'invictu2'); }, 5000);
                        console.log('Jogador 2')
                    }
                }
            }    
        }
        //Diagonal p/ baixo
        for (let i = 0; i < array.length - 3; i++) {            
            for (let j = 0; j < array[i].length - 2; j++) {

                if (array[i][j] !== " "
                    &&
                    array[i][j] === array[i+1][j+1]
                    &&
                    array[i][j] === array[i+2][j+2]
                    &&
                    array[i][j] === array[i+3][j+3]){  
                    won = true;    
                    if(array[i][j] === '1') {
                        // setTimeout(() => { winner(jogadorUm, 'invictu1'); }, 5000);
                        console.log('Jogador 1')
                    }
                    else {
                        // setTimeout(() => { winner(jogadorDois, 'invictu2'); }, 5000);
                        console.log('Jogador 2')
                    }
                } 
            }
        }
        //Diagonal p/ cima
        for (let i = array.length - 2; i < array.length; i++) {            
            for (let j = 0; j < array[i].length - 3; j++) {

                if (array[i][j] !== " "
                    &&
                    array[i][j] === array[i-1][j+1]
                    &&
                    array[i][j] === array[i-2][j+2]
                    &&
                    array[i][j] === array[i-3][j+3]){
                    won = true; 
                    if(array[i][j] === '1') {
                        // setTimeout(() => { winner(jogadorUm, 'invictu1'); }, 5000);
                        console.log('Jogador 1')
                    }
                    else {
                        // setTimeout(() => { winner(jogadorDois, 'invictu2'); }, 5000);
                        console.log('Jogador 2')
                    }
                }
            }
        }

        if (!won) {
            const cols = [...document.querySelectorAll('div.game__col')].map(col => col.children).filter(col => col.length !== 7)

            if (cols.length) {
                console.log('Tie')
            }
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
