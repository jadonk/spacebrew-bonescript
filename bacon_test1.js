var b = require('bonescript');
var Spacebrew = require('spacebrew').Spacebrew;

var random_id = "0000" + Math.floor(Math.random() * 10000);
var app_name = "BeagleBone Bacon Cape " + random_id.substring(random_id.length-4);

var button = "P8_19";
var slider = "P9_36";
var led_red = 'P9_42';
var led_green = 'P9_14';
var led_blue = 'P9_16';
var buttonState = b.HIGH;
var sliderState = 0;

// configure digital I/O pins
b.pinMode(button, b.INPUT);
b.pinMode(led_red, b.OUTPUT);
b.pinMode(led_green, b.OUTPUT);
b.pinMode(led_blue, b.OUTPUT);

// create spacebrew client object
//var sb = new Spacebrew.Client({reconnect:true, server:'192.168.7.2', port:9000});
var sb = new Spacebrew.Client({reconnect:true});

// set the base description
sb.name(app_name);
sb.description("This spacebrew client runs on BeagleBone with BoneScript and interacts with the Bacon Cape.");

// configure the publication and subscription feeds
sb.addPublish("buttonPress", "boolean", "false");
sb.addPublish("slider", "range", "0");
sb.addSubscribe("red", "range", "0");
sb.addSubscribe("green", "range", "0");
sb.addSubscribe("blue", "range", "0");

// override Spacebrew events - this is how you catch events coming from Spacebrew
sb.onOpen = onOpen;
sb.onRangeMessage = onRangeMessage;

// connect to spacbrew
sb.connect();

function onOpen() {
    setInterval(readButton, 100);
    setInterval(readSlider, 100);
}

function readButton() {
    b.digitalRead(button, onButtonRead);
}

function onButtonRead(x) {
    if(buttonState != x.value) {
        buttonState = x.value;
        sb.send("buttonPress", "boolean", (x.value == b.LOW) ? "true" : "false");
    }
}

function readSlider() {
    b.analogRead(slider, onSliderRead);
}

function onSliderRead(x) {
    if(sliderState != x.value) {
        sliderState = x.value;
        sb.send("slider", "range", "" + parseInt(x.value * 1023, 10));
    }
}

function onRangeMessage(name, value) {
    var intensity = 1.0 - (value/1023);
    switch(name) {
        case "red": 
            b.analogWrite(led_red, intensity);
            break;
        case "blue": 
            b.analogWrite(led_blue, intensity);
            break;
        case "green": 
            b.analogWrite(led_green, intensity);
            break;
    }
}
