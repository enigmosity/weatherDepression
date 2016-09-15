



var pageheader = $("#page-header")[0];
var pagecontainer = $("#page-container")[0];


//city = textfield.value;
//alert("test");

function getText(warmth, text) {
    if (warmth == "Roasting" && text == "Sunny") {
        var toWrite = "It's likely to get you down simply because you'll feel like you're being roasted. Go down to the store, buy a bag of ice, dump it all in your bath and wait out the day. "
    } else if (warmth == "Warm" && (text.includes("Sunny")) || text.includes("Clear")) {
        var toWrite = "It's gonna be a perfect day, gather your mates, get outside and play some footy or head to the beach, you'll feel great all day long.";
    } else if (warmth != "cold" && warmth != "Roasting" && text.includes("cloudy"||"Cloudy")) {
        var toWrite = "The day is going to be an average one, dress for the temperature and you should be right, or stay at home in bed, I'm not your mother.";
    } else if (warmth == "cold") {
        var toWrite = "She's gonna be chilly! If you're going out, be sure to wrap up warm, otherwise, fill the bath or go back to bed, it's not worth it.";
    } else if (text == "Rain") {
        var toWrite = "It's a rainy day incoming, grab your waterproof gear, or your togs, either way, there'll be relaxing pitter patter sounds all around";
    } else if (text == "Breezy") {
        var toWrite = "It's a windy day inbound, make sure you've got a shell or something otherwise that wind will cut right through you, reducing how good your day is, and how good you're feeling at the end of it too";
    } else {
        var toWrite = "There's something random going on here, you'll have to make these decisions for yourself on this one";
    }
    alert(toWrite);
    return toWrite;
}

function getWarmth(temp) {
    if (temp > 35) {
        var warmth = "Roasting";
    } else if (temp > 18) {
         var warmth = "Warm";
    } else if (temp > 10) {
         var warmth = "Meh";
    } else if (temp > 0) {
         var warmth = "tad chilly";
    } else if (temp < 0) {
        var warmth = "cold";
    } else {
        alert("Something went wrong");
    }
        return warmth;
}

function changeUserInterface(city, info, text) {
    (<HTMLInputElement>document.getElementById("page-header")).innerHTML = "<p id='page-header'>" + city + " is " + info + " degrees celsius. " + text + "</p>";
    //
    pagecontainer.innerHTML = "Change"; //city + "is" + info + "degrees fahrenheit today." + text;
    
}


function getWeather() {
    var start = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22";
    var end = "%22)%20and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
    var textfield = (<HTMLInputElement>document.getElementById("textfield")).value;
    var callPiece = start + textfield + end;
    $.get(callPiece, function (data) {
        if (data == null) {
            var message = "There seems to be a problem with " + textfield + ". Try another location.";
            alert(message);
        } else {
            var wind = data.query.results.channel.wind;
            //var condition = data.query.results.channel.condition;
            var text = data.query.results.channel.item.condition.text;
            alert(text);
            var temp = data.query.results.channel.item.condition.temp;
            alert(+temp);
            var warmth = getWarmth(Number(temp));
            alert(warmth);
            var toWrite = getText(warmth, text);
            changeUserInterface(textfield, temp, toWrite);
        }
    });
}



