const weather = document.querySelector('.weather');

fetch('http://api.openweathermap.org/data/2.5/weather?q=LVIV&units=metric&APPID=5d066958a60d315387d9492393935c19')
    .then((res) => { return res.json() })
    .then(function (data) {
        const townName = data.name;
        const windDeg = data.wind.deg;
        const windSpeed = Math.round(data.wind.speed);
        const pressure = data.main.pressure;
        const humidity = data.main.humidity;
        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const weatherIcon = data.weather[0].icon;
        const weatherStatus = data.weather[0].main;
        const degreesSymbol = String.fromCharCode(176);
        const cubicMeterSymbol = String.fromCharCode(179)
        const windDirection = getWindDirection(data.wind.deg)

        const template = `
        <div class="weather__header">
            <div class="weather__main">
                <div class="weather__city">${townName}</div>
                <div class="weather__status">${weatherStatus}</div>
            </div>
            <div class="weather__icon">
                <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
            </div>
        </div>
        <div class="weather__temp">тeмпература: <span>${temp} ${degreesSymbol}С</span></div>
        <div class="weather__pressure">тиск: <span>${pressure} гПа</span></div>
        <div class="weather__humidity">вологість: <span>${humidity} г/м${cubicMeterSymbol}</span></div>
        <div class="weather__wind-speed">швидкість вітру: <span>${windSpeed} м/с</span></div>
        <div class="weather__wind-deg">напрям вітру: <span>${windDeg}${degreesSymbol} ${windDirection}</span></div>
        <div class="weather__description">опис: <span>${description}</span></div>
    `
        weather.innerHTML = template;
    })
    .catch((err) => {console.log(err)})
    //определение направления ветра
    function getWindDirection(degrees) {
        const direction = ['С', 'С-В', 'В', 'Ю-В', 'Ю', 'Ю-З', 'З', 'С-З'];
        const index = Math.round(degrees / 45) % 8;
        return direction[index];
    }


