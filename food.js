function Food(type) {
    this.type = type;
    this.pos;
    this.value;
    this.alive = false;
    this.color;
    switch (type) {
        case 'normal':
            this.value = 10;
            this.color = createVector(255, 0, 100)
            break;
        case 'special':
            this.value = floor(random(50, 100));
            this.color = createVector(0, 255, 0);
            break;
        case 'speed':
            this.value = 50;
            this.color = createVector(255, 255, 0);
            break;
        case 'fase':
            this.value = 100;
            this.color = createVector(0, 0, 255);
            break;
    }



    this.show = function() {
        if (this.alive) {
            fill(this.color.x, this.color.y, this.color.z);
            rect(this.pos.x, this.pos.y, scl, scl)
        }
    }

    this.findLocation = function() {
        let cols = floor(playArea.width / scl);
        let rows = floor(playArea.height / scl);
        this.pos = createVector(floor(random(cols)), floor(random(rows)));
        this.pos.mult(scl);
        this.points = 10 * this.mult;
        this.alive = true;
    }
}