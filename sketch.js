let s;
let s2
let scl = 20;
let countDown;
let countDown1;
let countDown2;

let food;
let fase;
let special;
let speed;
let playArea = {}
let highSc = 0;


let gameMode = 'normal';
let fightNumb = 500;

function setup() {
    createCanvas(850, 600);
    playArea.height = 600;
    playArea.width = 600;
    s = new Snake(0);
    food = new Food('normal');
    special = new Food('special');
    speed = new Food('speed');
    fase = new Food('fase');
    frameRate(10);
    food.findLocation();
}

function mousePressed() {
    s.total++;
}



function draw() {
    fill(255);
    background(51);
    line(playArea.width, 0, playArea.width, playArea.height);
    textSize(15);
    sidebar();
    if (s.eat(food)) {
        food.findLocation();
        specials();
    }
    if (special.alive) {
        if (s.eat(special)) {
            special.alive = false;
            clearTimeout(countDown);
        }
    }
    if (speed.alive) {
        if (s.eat(speed)) {
            speed.alive = false;
            clearTimeout(countDown1);
        }
    }
    if (fase.alive) {
        if (s.eat(fase)) {
            fase.alive = false;
            clearTimeout(countDown2);
        }
    }

    if (s2) {
        if (s2.eat(food)) {
            food.findLocation();
            specials();
        }
        if (special.alive) {
            if (s2.eat(special)) {
                special.alive = false;
                clearTimeout(countDown);
            }
        }
        if (speed.alive) {
            if (s2.eat(speed)) {
                speed.alive = false;
                clearTimeout(countDown1);
            }
        }
        if (fase.alive) {
            if (s2.eat(fase)) {
                fase.alive = false;
                clearTimeout(countDown2);
            }
        }
    }
    checkKey();
    if (s2) {
        s2.death();
    }

    if (s.alive) {
        s.death();
    }

    if (s.alive) {
        s.update();
    }
    if (s2) {
        if (s2.alive) {
            s2.update();
        }
    }

    s.show();
    if (s2) {
        s2.show();
    }


    food.show();
    if (special.alive) {
        special.show();
    }
    if (speed.alive) {
        speed.show();
    }
    if (fase.alive) {
        fase.show();
    }

}

function checkKey() {
    if (keyIsDown(UP_ARROW)) {
        if (!s.alive) {
            s.alive = true;
        }
        if (s.ySpeed !== 1) {
            s.dir(0, -1);

        }
    } else if (keyIsDown(DOWN_ARROW)) {
        if (!s.alive) {
            s.alive = true;
        }
        if (s.ySpeed !== -1) {
            s.dir(0, 1);

        }
    } else if (keyIsDown(RIGHT_ARROW)) {
        if (!s.alive) {
            s.alive = true;
        }
        if (s.xSpeed !== -1) {
            s.dir(1, 0);

        }
    } else if (keyIsDown(LEFT_ARROW)) {
        if (!s.alive) {
            s.alive = true;
        }
        if (s.xSpeed !== 1) {
            s.dir(-1, 0);

        }
    }

    if (keyIsDown(65)) { //a
        if (!s2) {
            s2 = new Snake(1)
        }
        if (!s2.alive) {
            s2.alive = true;
        }
        if (s2.xSpeed !== 1) {
            s2.dir(-1, 0);

        }

    } else if (keyIsDown(68)) { //d
        if (!s2) {
            s2 = new Snake(1)
        }
        if (!s2.alive) {
            s2.alive = true;
        }
        if (s2.xSpeed !== -1) {
            s2.dir(1, 0);

        }

    } else if (keyIsDown(83)) { //s
        if (!s2) {
            s2 = new Snake(1)
        }
        if (!s2.alive) {
            s2.alive = true;
        }
        if (s2.ySpeed !== -1) {
            s2.dir(0, 1);

        }

    } else if (keyIsDown(87)) { //w
        if (!s2) {
            s2 = new Snake(1)
        }
        if (!s2.alive) {
            s2.alive = true;
        }
        if (s2.ySpeed !== 1) {
            s2.dir(0, -1);

        }


    }


    if (keyIsDown(49)) { //1
        if (s.colorId < 5) {
            s.colorId++;
        } else {
            s.colorId = 0;
        }
        s.updtColor();

    }

    if (keyIsDown(50)) { //2
        if (s2.colorId < 5) {
            s2.colorId++;
        } else {
            s2.colorId = 0;
        }
        s2.updtColor();

    }

    if (keyIsDown(70)) {
        if (s2) {
            s.die();
            s2.die();

            highSc = 0;
            gameMode = 'fight';
            fightNumb = prompt("fight untill how much points", "500");
        }
    }
}

function specials() {
    if (floor(random(1, 5)) === 1) { //special
        console.log('new special')
        special.alive = true;
        special.findLocation();
        countDown = setTimeout(() => {
            console.log('del')
            special.alive = false;
        }, floor(random(3000, 10000)));
    }
    if (floor(random(1, 10)) === 1) { //speed
        console.log('new speed')
        speed.alive = true;
        speed.findLocation();
        countDown1 = setTimeout(() => {
            console.log('del')
            speed.alive = false;
        }, floor(random(5000, 13000)));
    }
    if (floor(random(1, 15)) === 1) { //fase
        console.log('new fase')
        fase.alive = true;
        fase.findLocation();
        countDown2 = setTimeout(() => {
            console.log('del')
            fase.alive = false;
        }, floor(random(5000, 10000)));
    }


}

function sidebar() {
    fill(255);
    textSize(18);
    text('blocks: ', 620, 20);
    fill(255, 0, 100);
    rect(620, 40, scl, scl);
    fill(255);
    text('- normal: 10pts', 650, 55);
    fill(0, 255, 0);
    rect(620, 80, scl, scl);
    fill(255);
    text('-special: 50-100pts', 650, 95);
    fill(255, 255, 0);
    rect(620, 120, scl, scl);
    fill(255);
    text('-speed: speed x2', 650, 135);
    fill(0, 0, 255);
    rect(620, 160, scl, scl);
    fill(255);
    text('-fase: go through walls', 650, 175);
    line(600, 300, 850, 300)
    fill(255);
    text('HighScore: ' + highSc, 620, 330);
    fill(s.color.x, s.color.y, s.color.z);
    line(600, 340, 850, 340)
    rect(620, 350, scl, scl);
    fill(s.color.x, s.color.y, s.color.z);
    fill(255);
    text('Player 1: ' + s.points + 'pts', 650, 365)
    if (s.speedUp === true) {
        fill(255, 255, 0);
        rect(620, 380, scl, scl);
    }
    if (s.fase === true) {
        fill(0, 0, 255);
        rect(650, 380, scl, scl);
    }
    line(600, 410, 850, 410)
    if (s2) {
        fill(s2.color.x, s2.color.y, s2.color.z);
        rect(620, 420, scl, scl);
        fill(s2.color.x, s2.color.y, s2.color.z);
        fill(255);
        text('Player 2: ' + s2.points + 'pts', 650, 435)
        if (s2.speedUp === true) {
            fill(255, 255, 0);
            rect(620, 450, scl, scl);
        }
    }
    line(600, 480, 850, 480)
    fill(255);
    text('Game mode: ' + gameMode, 620, 500);



}