// https://stackoverflow.com/questions/38709923/why-is-requestanimationframe-better-than-setinterval-or-settimeout

// game const and variables
let direction = { x: 0, y: 0 };
let score = 0;
const foodsound=new Audio('food.mp3');
const gameoversound=new Audio('gameover.mp3')
const movesound=new Audio('move.mp3');
const musicsound=new Audio('music.mp3');
let speed = 1;
let lastpaintime = 0;
let snakearr = [{ x: 13, y: 15 }]
let food = { x: 6, y: 7 }

// game functions
function main(cur_time) {
    window.requestAnimationFrame(main);    // requestAnimationFrame is prefer over setinterval for repeating in a loop
    if ((cur_time - lastpaintime) / 1000 < 1 / speed) {   // this will control the speed of loop
        return;    // if the condition is true , then it will not renderr any thing
    }

    lastpaintime = cur_time;
    // console.log(cur_time);
    gamengine(); // this will run the game
}

function isCollide(snakearr) {
    //case 1 if the snake meet itself
    for (let index = 1; index < snakearr.length; index++) {
        if (snakearr[0].x == snakearr[index].x && snakearr[0].y == snakearr[index].y) return true;
    }
    // case 2 boundary condition
    if (snakearr[0].x >= 18 || snakearr[0].x <= 0 || snakearr[0].y >= 18 || snakearr[0].y <= 0) return true;
    return false;
}
function gamengine() {
    musicsound.play();
    //  part 1 : update the snake array (location of snake)
    if (isCollide(snakearr)) {
        gameoversound.play();
        musicsound.pause();
        direction = { x: 0, y: 0 };
        alert("game over , press any key to conitnue");
        snakearr = [{ x: 13, y: 15 }];
        musicsound.play();
        score = 0;
        Score.innerHTML = "Score: " + score;
        speed=1;
    }

    // if u have eaten the food then incremet the score and increase the length of snake and place the food in its new position

    if (snakearr[0].x == food.x && snakearr[0].y == food.y) {
        foodsound.play();
        score = score + 1;
        speed=speed  + 1;
        // console.log(hi+" "+score);
        if(hi<score){
            hi=score;
            localStorage.setItem("hiscore", JSON.stringify(hi));
            hiscorebox.innerHTML="HiScore: "+hi;
        }
       
        Score.innerHTML = "Score: " + score;
        snakearr.unshift({ x: snakearr[0].x + direction.x, y: snakearr[0].y + direction.y }); // unshift add new element in front of array and adds one segment in front previous snakearr
        let a = 2;  //  a and b are the numbers in between which food is place randomly
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    //Move the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] }   // if we normally make snakearr[i]=snakearr[i+1] then it will start to refer that object particularly , and eventually all will point to a single object of snakearr, so to overcome this problem , we will make a new object which has copy of snakearr[i+1] using {...}

    }
    snakearr[0].x += direction.x;
    snakearr[0].y += direction.y;


    // part 2 : render the snake and food

    // display the snake
    board.innerHTML = "";  // empty the the board content if any
    snakearr.forEach((e, index) => {
        snakeelement = document.createElement('div');   // add div container in our html
        snakeelement.style.gridRowStart = e.y; // it will place the div element at that particular row
        snakeelement.style.gridColumnStart = e.x;
        if (index == 0)
            snakeelement.classList.add('head');
        else
            snakeelement.classList.add('snake_body');
        board.appendChild(snakeelement);   //The appendChild() method appends a node as the last child of a node.
    })

    // display the food
    foodelement = document.createElement('div');   // add div container in our html
    foodelement.style.gridRowStart = food.y; // it will place the div element at that particular row
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add('food');
    board.appendChild(foodelement);

}



// main logic
let hiscore = localStorage.getItem("hiscore");  //The localStorage object stores data with no expiration date. The data will not be deleted when the browser is closed, and will be available the next day, week, or year
if (hiscore === null) {
    hi= 0;
    localStorage.setItem("hiscore", JSON.stringify(hi));
}
else {
    hi=JSON.parse(hiscore);
    hiscorebox.innerHTML="HiScore: "+ hiscore;
    
}
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    direction = { x: 0, y: 1 }; // start the game by pressing any key
      movesound.play();
    switch (e.key) {
        case "ArrowUp": console.log("Arrow Up");
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown": console.log("Arrow down");
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft": console.log("Arrow left");
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight": console.log("Arrow right");
            direction.x = 1;
            direction.y = 0;
            break;
        default: break;

    }
})