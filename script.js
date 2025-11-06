const apiKey = 'a41b28947c318944b1ded0c00713c883';
const card = document.querySelector('.card');
const searchBox = document.querySelector('.card_input');
const searchBtn = document.getElementById('searchBtn');
const temp = document.querySelector('.card_title--temp');
const cityName = document.querySelector('.card_title--city');
const hum = document.getElementById('humidity');
const wind = document.getElementById('wind');
const icon = document.querySelector('.card_weather-icon');
const date = document.getElementById('date');

const showDate = () => {
    const now = new Date();
    const day = now.getDate();
    const monthName = now.toLocaleString('en', {month: 'long'})
    date.innerHTML = `${day} ${monthName}`;
}

async function getWeather(city){
    city = city.trim();
    if (!city) return;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) throw new Error('City not found');

        const result = await response.json();

        console.log(result);

        card.classList.add('active');
        card.style.height = '530px';

        const iconURL = `https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`;
        icon.src = iconURL;

        cityName.innerHTML = result.name;
        hum.innerHTML = `${result.main.humidity} %`;
        wind.innerHTML = `${result.wind.speed} m/s`;
        temp.innerHTML = `${Math.round(result.main.temp)}°C`;
    }
    catch(err){
        alert(err);
    }
}

searchBtn.addEventListener('click', ()=>{
    getWeather(searchBox.value);
});

searchBox.addEventListener('keypress', (e)=>{
    if (e.key === 'Enter'){
        getWeather(searchBox.value);}
});

document.addEventListener('click', (e) =>{
    if (card.classList.contains('active') && !card.contains(e.target)){
        card.classList.remove('active');
        card.style.height = '230px';
        searchBox.value = '';
    }
});

showDate();