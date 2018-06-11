function Snake(ind) {
    if (ind === 0) {
        this.x = 0;
        this.y = 0;
    } else {
        this.x = playArea.width - scl;
        this.y = playArea.height - scl;
    }
    this.xSpeed = 0;
    if (ind === 0) {
        this.ySpeed = 1
    } else {
        this.ySpeed = -1
    }
    this.total = 0;
    this.tail = [];
    this.points = 0;
    this.alive = true;
    this.colorId = 0;
    this.color = createVector(255, 255, 255);
    this.speedUp = false;
    this.fase = false;
    this.ind = ind;
    this.speedUpTi;
    this.faseTi;



    this.update = function() {
        if (this.total === this.tail.length) {
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);

        this.x = this.x + this.xSpeed * scl;
        this.y = this.y + this.ySpeed * scl;
        //this.x = constrain(this.x, 0, width - scl);
        //this.y = constrain(this.y, 0, height - scl);
        if (this.x > playArea.width - scl) {

            if (this.fase) {
                this.x = 0;
            } else {
                this.die();
            }

        } else if (this.x < 0) {
            if (this.fase) {
                this.x = playArea.width - scl;
            } else {
                this.die();
            }
        } else if (this.y > playArea.height - scl) {
            if (this.fase) {
                this.y = 0;
            } else {
                this.die();
            }
        } else if (this.y < 0) {
            if (this.fase) {
                this.y = playArea.height - scl;
            } else {
                this.die();
            }
        }


    }

    this.die = function() {
        this.total = 0;
        this.tail = [];
        if (ind === 0) {
            this.x = 0;
            this.y = 0;
        } else {
            this.x = playArea.width - scl;
            this.y = playArea.height - scl;
        }
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.points = 0;
        this.alive = false;
        background(243, 0, 0);

    }

    this.death = function() {
        if (!this.fase) {
            for (var i = 0; i < s.tail.length; i++) {
                var pos = s.tail[i];
                var d = dist(this.x, this.y, pos.x, pos.y);
                if (d < 1) {
                    this.die();
                }
            }
            if (s2) {
                for (var i = 0; i < s2.tail.length; i++) {
                    var pos = s2.tail[i];
                    var d = dist(this.x, this.y, pos.x, pos.y);
                    if (d < 1) {
                        this.die();
                    }
                }
            }
        }
    }

    this.dir = function(x, y) {
        this.xSpeed = x;
        this.ySpeed = y;
    }

    this.show = function() {
        fill(this.color.x, this.color.y, this.color.z);
        for (var i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        fill(this.color.x, this.color.y, this.color.z);
        rect(this.x, this.y, scl, scl);
    }

    this.updtColor = function() {
        console.log('TT')
        switch (this.colorId) {
            case 0:
                this.color.x = 255;
                this.color.y = 255;
                this.color.z = 255;
                break;
            case 1:
                this.color.x = 0;
                this.color.y = 0;
                this.color.z = 0;
                break;
            case 2:
                this.color.x = 255;
                this.color.y = 150;
                this.color.z = 128;
                break;
            case 3:
                this.color.x = 144;
                this.color.y = 255;
                this.color.z = 69;
                break;
            case 4:
                this.color.x = 156;
                this.color.y = 165;
                this.color.z = 135;
                break;
            case 5:
                this.color.x = 88;
                this.color.y = 168;
                this.color.z = 255;
                break;
        }
    }

    this.highScore = function() {
        if (this.points > highSc) {
            highSc = this.points
            if (gameMode === 'fight' && highSc >= fightNumb) {
                alert(`player ${this.ind + 1} won`)
                highSc = 0;
                gameMode = 'normal';
                s.die();
                s2.die();
            }
        }
    }

    this.eat = function(food) {
        let pos = food.pos;
        let d = dist(this.x, this.y, pos.x, pos.y);
        //console.log(food.type + ':' + d);
        if (d < 1) {
            console.log('eaten: ' + food.type)
            if (food.alive) {
                this.total++;
                this.points += food.value;
                this.highScore();
                food.alive = false;


                //specials
                if (food.type === 'speed') {
                    frameRate(20);
                    this.speedUp = true;
                    speedUpTi = setTimeout(() => {
                        frameRate(10);
                        console.log('end')
                        this.speedUp = false;
                    }, 10000)
                }
                if (food.type === 'fase') {
                    this.fase = true;
                    faseTi = setTimeout(() => {
                        console.log('end')
                        this.fase = false;
                    }, 20000)

                }
            }
            return true;
        }
        return false;
    }

}