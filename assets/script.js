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



// André,




// Gabriel,



// Lucas



}
//André






//Gabriel

const inputNames = document.getElementById('inputNames');
const submit = document.getElementById('submit');

submit.addEventListener('click', function(){

    let jogadorUm = document.getElementById('inputUm').value;
    let jogadorDois = document.getElementById('inputDois').value;
    let playernameOne = document.getElementsByClassName('playername--one');
    let playernameTwo = document.getElementsByClassName('playername--two');
    playernameOne.innerText = jogadorUm;
    playernameTwo.innerText = jogadorDois;
    inputNames.className.add('hidden');

});










//Lucas

