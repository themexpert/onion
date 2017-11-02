(function(){
    var onions = [],
        max = 40,
        x, y,
        angle;

    function rain() {
        for(var i=0;i<max;i++) {
            pushNewOnion(true);
        }
        draw();
    }

    function setOffset(onion) {
        onion.offsetX += onion.angle;
        onion.offsetY += onion.speed;
        if(onion.offsetX < -100 || onion.offsetX - 100 > window.innerWidth || onion.offsetY - 100 > window.innerHeight) {
            return false;
        }
        onion.onion.style.left = onion.offsetX + 'px';
        onion.onion.style.top  = onion.offsetY + 'px';
        return true;
    }

    function draw() {
        for(var i=0;i<max;i++) {
            if(!setOffset(onions[i])) {
                onions[i].onion.remove();
                onions.splice(i, 1);
                pushNewOnion();
            }
        }
        setTimeout(draw, 50);
    }

    function pushNewOnion(init) {
        var onion = {
            onion: getOnion(random_int(1, 20)),
            angle: random_int(1, 4) * Math.floor(Math.random()*2) === 1 ? 1 : -1,
            speed: random_int(1, 5),
            offsetX: random_int(-100, window.innerWidth+100),
            offsetY: init ? random_int(-100, window.innerHeight+100) : -100
        };
        onions.push(onion);
        setOffset(onion);
    }

    function getOnion(i) {
        var el = document.createElement('div');
        el.className = 'img-holder';
        var img = document.createElement('img');
        img.src = '/onions/onion-'+i+'.svg';
        el.appendChild(img);
        document.body.appendChild(el);
        return el;
    }

    function random_int(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    rain();
})();