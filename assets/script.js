const rand_in_range = (min, max) => Math.floor(Math.random() * (max + 1)) + min

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
        const reset = document.querySelector('button.reset__button')

        this.matrix.start()
        this.animations.start()
        this.disks.start()
        this.input.start()
        this.controller.start()
        reset.addEventListener('click', this.reset.bind(this))
    },
    reset() {
        const cols = [...document.querySelectorAll('div.game__col')]
        const arrow = document.querySelector('i.fa-chevron-down')

        this.input.error_id = null
        this.column = 3
        cols.forEach(col => col.innerHTML = '')
        arrow.classList.remove('fa-chevron-down-color2')
        this.controller.render(arrow)
        this.disks.start()
        this.matrix.start()
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
        disk: {
            animate(disk, final_position) {
                setTimeout( _ => {
                    disk.style.top = `${47 * final_position + 40}px`
                })
                setTimeout( _ => {
                    disk.classList.remove('player__disk--animating')
                    disk.style.top = `${0}px`
                }, 500)
            }, 
            async drop_disks() {
                let cols = [...document.querySelectorAll('div.game__col')].map(col => [...col.children].filter(el => el.classList.contains('player__disk')))
                let total_el = 0
                const len = cols.length

                // await new Promise(r => setTimeout(r, 100))
                for (let i = 0; i < len; i++) {
                    const col = cols[i]

                    for (let j = 0; j < col.length; j++) {
                        const el = col[j]
                        total_el++

                        el.style.top = `${47 * (5 - j) + 40}px`
                        el.style.left = '50%'
                        el.style.position = 'absolute'
                        el.style.transform = 'translate(-50%, 0)'
                    }
                }

                for (let i = 0; i < len; i++) {
                    const index = rand_in_range(0, cols.length - 1)
                    const col = cols[index]

                    for (let j = 0; j < col.length; j++) {
                        const el = col[j]

                        setTimeout( _ => el.classList.add('player__disk--animating--drop'))
                        await new Promise(r => setTimeout(r, 100))
                    }
                    cols.splice(index, 1)
                }
                await new Promise(r => setTimeout(r, (total_el - 1) / 2 * 3 + 1000 * (total_el >= 1)))
                lig_4.reset()
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
                    if (container.children.length === 6) 
                        el.classList.add('disk--blank--first')
                    container.appendChild(el)
                }
                col.innerHTML = ''
                col.appendChild(container)
            })
        },
        new_disk() {
            const col = document.querySelector(`div#col_${lig_4.column}`)
            const seta = document.querySelector('i.fa-chevron-down')
            let y_axis = 0

            if (col.children.length < 6 + 1) {
                const disk = document.createElement('div')
                let cur_player = '1'

                disk.classList.add('player__disk')
                if (seta.classList.contains('fa-chevron-down-color2')) {
                    disk.classList.add('player__disk--two')
                    cur_player = '2'
                }
                disk.classList.add('player__disk--animating')
                col.appendChild(disk)
                
                while (y_axis < 6) {
                    if (lig_4.matrix.path[y_axis][lig_4.column] !== ' ') break
                    y_axis++
                }
                lig_4.matrix.path[--y_axis][lig_4.column] = cur_player
                lig_4.animations.disk.animate(disk, y_axis)

                return true
            }

            return false
        }
    },
    verify() {    
        let array = lig_4.matrix.path
        let won = false;
        let player = {
            name: null,
            two: false
        }

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
                        player.name = document.getElementById('inputUm').value;
                    }
                    else {
                        player.name = document.getElementById('inputDois').value;
                        player.two = true
                    }
                }
            }
        }
        // Vertical
        for (let i = 0; i < array.length - 3; i++) { 
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
                        player.name = document.getElementById('inputUm').value;
                    }
                    else {
                        player.name = document.getElementById('inputDois').value;
                        player.two = true
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
                        player.name = document.getElementById('inputUm').value;
                    }
                    else {
                        player.name = document.getElementById('inputDois').value;
                        player.two = true
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
                        player.name = document.getElementById('inputUm').value;
                    }
                    else {
                        player.name = document.getElementById('inputDois').value;
                        player.two = true
                    }
                }
            }
        }

        if (!won) {
            const cols = [...document.querySelectorAll('div.game__col')].map(col => col.children).filter(col => col.length !== 7)

            if (!cols.length) {
                this.win.set_winner(false, false, true)
            }
        } else this.win.set_winner(player.name, player.two)
    },
    win: {
        set_winner(player_name, player_two=false, tie=false) {
            const victory = document.querySelector('div.message_area');
            const conquer = document.createElement('div');

            conquer.classList.add('invictus');
            if (player_name) conquer.innerText = `${player_name} venceu!`;
            if (player_two) conquer.classList.add('invictus2')
            if (tie) conquer.innerText = 'Empate!'
            victory.innerHTML = ''
            victory.appendChild(conquer);
            victory.classList.remove('hidden')
            setTimeout( _ => {
                victory.classList.add('hidden')
                lig_4.reset()
            }, 4000)
        }
    }
}

//André

lig_4.start()

//Gabriel
function toggleFullScreen() {
    if (!document.fullscreenElement &&    
        !document.mozFullScreenElement && 
        !document.webkitFullscreenElement && 
        !document.msFullscreenElement ) {  
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  const buttonFullscreen = document.querySelector("#fullscreen");
  buttonFullscreen.addEventListener("click", function() {
    toggleFullScreen();
});


//Lucas
