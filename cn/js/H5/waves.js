var canvas;
var ctx;
var cHeight, cWidth;
var h1,h2,h3,h4,h5,w1,w2,w3;
var x, y;
var curr = 0;
function init()
{
    canvas = document.getElementById("canvas");
    canvas.height = canvas.offsetHeight*2;
    canvas.width = canvas.offsetWidth*2;
    cHeight = canvas.height;
    cWidth = canvas.width;
    w1 = cWidth  / 4;
    w2 = cWidth  / 2;
    w3 = 3 * cWidth  / 4;
    h1 = cHeight / 6;
    h2 = cHeight / 3;
    h3 = cHeight / 2;
    h4 = 2 * cHeight / 3;
    h5 = 5 * cHeight / 6;
    ctx = canvas.getContext("2d");
    ctx.lineJoin="round";
    animate();
}

function animate()
{
    clear();
    drawSine();
    setTimeout(animate,5);
}

function clear()
{
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,cWidth,cHeight);
    //ctx.fillStyle = "#347281";
    //ctx.fillRect (0,h3, cWidth, .5);
    ctx.fillRect (w1,h2, .5, h2);
    ctx.fillRect (w2,h1, .5, h4);
    ctx.fillRect (w3,h2, .5, h2);
}

function drawSine()
{
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.strokeStyle="#b4cbd1";
    //ctx.moveTo(0, h3 + Math.sin((-curr)/50)*120);
    ctx.moveTo(0, h3);
    //ctx.lineTo(50, h3);
    y =  Math.sin((100 - curr)/50)*120;
    for(var i = 0;i <= 240;i += 20)
    {
        x = i;
        y = h3 +  Math.sin((i- curr)/50)*i/2 ;
        ctx.lineTo(x , y );
         ctx.stroke();
    }
    for(var i = 240; i<= cWidth - 240;i += 20)
    {
        x = i;
        y = h3 + Math.sin((i- curr)/50)*120 ;
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    for(var i =  cWidth - 240;i <=  cWidth;i += 20)
    {
        x = i;
        y = h3 +  Math.sin((i- curr)/50)*(cWidth - i)/2 ;
        ctx.lineTo(x , y);
         ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle="#dee999";
    //ctx.moveTo(0, h3 + Math.sin((-curr)/50)*120);
    ctx.moveTo(0, h3);
    //ctx.lineTo(50, h3);
    y =  Math.sin((100 - curr - 100)/50)*120;
    for(var i = 0;i <=  240;i += 20)
    {
        x = i;
        y = h3 +  Math.sin((i- curr- 100)/50)*i/2;
        ctx.lineTo(x , y );
         ctx.stroke();
    }
    for(var i = 240; i<= cWidth - 240;i += 20)
    {
        x = i;
        y = h3 + Math.sin((i- curr- 100)/50)*120;
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    for(var i =  cWidth - 240;i <=  cWidth;i += 20)
    {
        x = i;
        y = h3 +  Math.sin((i- curr- 100)/50)*(cWidth - i)/2;
        ctx.lineTo(x , y);
         ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle="#fffbb2";
    //ctx.moveTo(0, h3 + Math.sin((-curr)/50)*120);
    ctx.moveTo(0, h3);
    //ctx.lineTo(50, h3);
    y =  Math.sin((100 - curr - 50)/50)*120;
    for(var i = 0;i <=  240;i += 20)
    {
        x = i;
        y = h3 +  Math.sin((i- curr- 50)/50)*i/2;
        ctx.lineTo(x , y );
         ctx.stroke();
    }
    for(var i = 240; i<= cWidth - 240;i += 20)
    {
        x = i;
        y = h3 + Math.sin((i- curr- 50)/50)*120;
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    for(var i =  cWidth - 240;i <=  cWidth;i += 20)
    {
        x = i;
        y = h3 +  Math.sin((i- curr- 50)/50)*(cWidth - i)/2;
        ctx.lineTo(x , y);
         ctx.stroke();
    }
    curr += Math.PI/2;
}
init();