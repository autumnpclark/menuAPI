
function createMenuHTML(item, menu){
    menuItem = '<div class="col">';
    menuItem += "<h2>" + item['name'] + "</h2>";
    if(!!menu['sponsor'])
    {
        menuItem += "<p>Sponsor: " + menu['sponsor'] + "</p>"
    }
    if(!!menu['thumbnail_src'])
    {
        menuItem += '<img src="' + menu['thumbnail_src'] + '"/>'
    }
    if(!!item['first_appeared'])
    {
        menuItem += "<p>First Appeared: " + item['first_appeared'] + "</p>"
    }
    menuItem += "<p>Need more ideas? " + "<a href='http://menus.nypl.org/menus/" + menu['id'] + "'> View the original menu</a>";
    if(!!menu['language'])
    {
        menuItem += "<p>Language: " + menu['language'] + "</p>";
    }
    if(!!menu['page_count'])
    {
        menuItem += "<p>Pages: " + menu['page_count'] + "</p>";
    }
    if(!!menu['dish_count'])
    {
        menuItem += "<p>Number of dishes in menu: " + menu['dish_count'] + "</p>";
    }
    menuItem += '</div>';
    return menuItem;
}

let getMenu = async (dishObject) => {
    let menuLink = dishObject['links'][1]['href'];
    let response = await fetch("https://cors-anywhere.herokuapp.com/" + menuLink + "?token=txqoka7kqtsraxlbmzykmhltpm");
    let jsonData = await response.json();

    // let imageUrl = jsonData['menus'][0]["thumbnail_src"];
    return jsonData['menus'][0];
}

let searchDish = async (query) => {
    let menuItem = '<div class="container">';
    menuItem += '<div class="row">';
    
    let tmp = menuItem
    tmp += '<div class="col">';
    tmp += "<h1>Loading...</h1>";
    tmp += "</div>";
    tmp += "</div>";
    tmp += "</div>";
    document.getElementById("dishResults").innerHTML = tmp;

    const url = "https://cors-anywhere.herokuapp.com/http://api.menus.nypl.org/dishes/search?query=" + query + "&token=txqoka7kqtsraxlbmzykmhltpm";
    let response = await fetch(url);
    let jsonData = await response.json();
    console.log(jsonData);
    let requestTotal = 12;


    if(!("strings" in jsonData)) {
        menuItem += '<div class="col">';
        menuItem += "<h1>No Results Found</h1>";
        menuItem += "</div>";
        menuItem += "</div>";
        menuItem += "</div>";
        document.getElementById("dishResults").innerHTML = menuItem;
        return 
    }

    for (let i = 0; i < Math.min(requestTotal, jsonData['strings'].length); i++)
    {
        let item = jsonData['strings'][i];
        let menu = await getMenu(item);

        if(!!menu)
        {
            menuItem += createMenuHTML(item, menu);
        }
        else {
            requestTotal++;
        }
    }
    menuItem += "</div>";
    menuItem += "</div>";
    document.getElementById("dishResults").innerHTML = menuItem;
    //let forecast = '<div class="forecast">';
    //         forecast += '<h2>5 Day Forecast</h2>';
    //         forecast += '</div>'
    //         forecast += "<div class='container'>";
    //         forecast += '<div class="row">';

    //         for (let i=0; i < 5; i++) {
    //             // forecast += '<div class="section-container">';
    //             for(let j=0; j < 8; j++) {
    //                 let item = json.list[i*8 + j];
    //                 forecast += createWeatherHTML(item);
    //             }
    //         }
    //         forecast += "</div>"
    //         forecast += "</div>"
    //         document.getElementById("forecastResults").innerHTML = forecast;
    //     });

}

document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
      return;
    console.log(value);
    searchDish(value);
  
    
  
    // const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=22a56a130e3fd99ae00a53a85e240037";
    // fetch(url)
    //     .then(function(response) {
    //         return response.json();
    //     }).then(function(json) {
    //         console.log(json)
    //         let results = "";
    //         results += "<h1>" + json.name + "</h1>";
    //         for (let i=0; i < json.weather.length; i++) {
    //             results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/> <br>';
    //         }
    //         for (let i=0; i < json.weather.length; i++) {
    //             results += json.weather[i].description
    //             if (i !== json.weather.length - 1)
    //                 results += ", "
    //         }
    //         results += '<h2>' + json.main.temp + " &deg;F</h2>"
    //         results += "<p>Feels Like: " + json.main.feels_like + "</p>";
    //         results += "<p>Minimum Temperature: " + json.main.temp_min + "</p>";
    //         results += "<p>Maximum Temperature: " + json.main.temp_max + "</p>";
    //         results += "<p>Sunrise: " + moment(json.sys.sunrise).format('h:mm:ss a') + "</p>";
    //         results += "<p>Sunset: " + moment(json.sys.sunset).format('h:mm:ss a') + "</p>";
    //         results += "<p>"
            
    //         results += "</p>";
    //         document.getElementById("weatherResults").innerHTML = results;
    //     });

    // const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=22a56a130e3fd99ae00a53a85e240037";
    // fetch(url2)
    //     .then(function(response) {
    //         return response.json();
    //     }).then(function(json) {
    //         console.log(json);
    //         let forecast = '<div class="forecast">';
    //         forecast += '<h2>5 Day Forecast</h2>';
    //         forecast += '</div>'
    //         forecast += "<div class='container'>";
    //         forecast += '<div class="row">';

    //         for (let i=0; i < 5; i++) {
    //             // forecast += '<div class="section-container">';
    //             for(let j=0; j < 8; j++) {
    //                 let item = json.list[i*8 + j];
    //                 forecast += createWeatherHTML(item);
    //             }
    //         }
    //         forecast += "</div>"
    //         forecast += "</div>"
    //         document.getElementById("forecastResults").innerHTML = forecast;
    //     });
});