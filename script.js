const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const $gameTime = document.querySelector('#game_time');
let colors = ['gray', 'blue', 'pink', 'yellow', 'orange', 'purple'];
let score = 0;


$start.addEventListener('click', startGameFunc);
$game.addEventListener('click', hendalBoxFunc);
$gameTime.addEventListener('input', gameTimeFunc);



function startGameFunc(){
    score = 0;
    $result.textContent = 0;
    $game.style.border = '2px dashed gray';
    $game.style.backgroundColor = '#fff';
    $start.setAttribute('disabled', 'true');

   
    let interval = setInterval(function(){
        let time = +$time.textContent;
        if(time <= 0){
            clearInterval(interval);
            endGame();
        }else{
            // console.log(time);
            $time.textContent = (time-0.1).toFixed(1);
        }
    },100);
    $gameTime.setAttribute('disabled', 'true');
    renderBox();

}

function endGame(){
    $game.innerHTML = '';
    $game.style.backgroundColor = '#ccc';
    $time.textContent = $gameTime.value + '.0';
    $gameTime.removeAttribute('disabled');
    $start.removeAttribute('disabled');
}
function renderBox(){
    $game.innerHTML = '';
    let box = document.createElement('div');
    box.innerText = 'click me';
    box.style.color = 'red';
    box.style.alignItems = 'center';
    box.style.justifyContent = 'center';
    box.style.display = 'flex';
    let boxSize = getRandom(60, 100);
    let gameSize = $game.getBoundingClientRect();
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;
    let index = getRandom(0, colors.length);

    

    box.style.height = boxSize + 'px';
    box.style.width = boxSize + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.cursor = 'pointer';
    box.style.position = 'absolute';
    box.style.backgroundColor = colors[index];
    box.setAttribute('data-box', 'true');

    $game.appendChild(box);
    
}

function hendalBoxFunc(e){
    if(e.target.dataset.box){
        $result.textContent = ++score;
        renderBox();
    }
}

function gameTimeFunc(){
    $time.textContent =  $gameTime.value + '.0';
}


function getRandom(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

