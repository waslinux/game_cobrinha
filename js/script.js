let canvas = document.getElementById("snake"); //usando canvas para criar o jogo
let context = canvas.getContext("2d"); //....
let box = 32;
let snake = []; 
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right";

let comida ={ //gerar nova comida em lugares aleatórios.
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "rgb(22, 36, 37)";
    context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retângulo usando x e y e a largura e altura setadas
}

function criarCobrinha (){ //criar corpo da cobra
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function renderComida (){ // desenha o retãngulo comida.
    context.fillStyle = "red";
    context.fillRect(comida.x, comida.y, box, box);
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){    

    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++){ // parar o jogo assim que a cabeça encostar no corpo
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG();
    criarCobrinha();
    renderComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != comida.x || snakeY != comida.y){
        snake.pop(); //pop tira o último elemento da lista
    }else{
        comida.x = Math.floor(Math.random() * 15 +1) * box;
        comida.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    let novaCabeca ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(novaCabeca); //método unshift adiciona como primeiro quadradinho da cobrinha
}

let jogo = setInterval(iniciarJogo, 100);
