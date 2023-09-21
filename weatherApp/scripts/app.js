const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = (data) => {



    const {cityDetails,weather} = data;

    details.innerHTML = `
            <h5 class="my-4">${cityDetails.EnglishName}</h5>
                <div class="my-4">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;</span>
                </div>
    `;

    const iconSrc = `photos/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);

    

    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc ='photos/day.svg';
    } else {
        timeSrc ='photos/night.svg';
    }
    time.setAttribute('src',timeSrc);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) =>{
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return{cityDetails, weather};
};

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

});

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(date => updateUI(data))
    .catch(err => console.log(err));
}
