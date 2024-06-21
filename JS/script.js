var searching = document.getElementById('searching');
searching.addEventListener('input', function(){
display(searching.value)
});
display('alexandria');
async function display(location){

    var result = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=d20931b9e4644beea33154015241906&q=${location}&days=3`)
    var data = await result.json();
    console.log(data)
    var disp = `
    <div class="today-weather">
          <div class="weather-head">
            <div class="day ">
              ${getWeekdayName(data.forecast.forecastday[0].date)}
            </div>
            <div class="date ">
              ${formateDate(data.forecast.forecastday[0].date)}
            </div>
          </div>
          <div class="weather-content">
            <div class="location ">
              ${data.location.name}
            </div>
            <div class="degree">
              <div class="num ">
                ${data.forecast.forecastday[0].hour[currentHour].temp_c}
                <sup>o</sup>
                C
              </div>
              <div class="weather-icon">
                <img src="https:${data.forecast.forecastday[0].hour[currentHour].condition.icon}" alt="" width="90">
              </div>
            </div>
            <div class="custom">
            ${data.forecast.forecastday[0].hour[currentHour].condition.text}
            </div>
            <span class="text-secondary">
              <img src="./Images/icon-umberella.png" alt="">
              ${data.forecast.forecastday[0].hour[currentHour].chance_of_rain}%
            </span>
            <span class="text-secondary">
              <img src="./Images/icon-wind.png" alt="">
              ${data.forecast.forecastday[0].hour[currentHour].wind_kph}km/h
            </span>
            <span class="text-secondary">
              <img src="./Images/icon-compass.png" alt="">
              ${data.forecast.forecastday[0].hour[currentHour].wind_dir}
            </span>
          </div>
        </div>
        <div class="weather-tomorrow">
          <div class="weather-head">
            <div class="day">
            ${getWeekdayName(data.forecast.forecastday[1].date)}
            </div>
          </div>
          <div class="weather-content">

            <div class="weather-icon">
              <img src="https:${data.forecast.forecastday[1].day.condition.icon}" alt="" width="48">
            </div>
            <div class="degree">
              ${data.forecast.forecastday[1].day.maxtemp_c}
              <sup>o</sup>
              C
            </div>
            <small>
            ${data.forecast.forecastday[1].day.mintemp_c}
              <sup>o</sup>
              C
            </small>
            <div class="custom">
            ${data.forecast.forecastday[1].day.condition.text}
            </div>
          </div>
        </div>
        <div class="weather-after">
          <div class="weather-head">
            <div class="day">
            ${getWeekdayName(data.forecast.forecastday[2].date)}
            </div>
          </div>
          <div class="weather-content">

            <div class="weather-icon">
              <img src="https:${data.forecast.forecastday[2].day.condition.icon}" alt="" width="48">
            </div>
            <div class="degree">
            ${data.forecast.forecastday[2].day.maxtemp_c}
              <sup>o</sup>
              C
            </div>
            <small>
               ${data.forecast.forecastday[2].day.mintemp_c}
              <sup>o</sup>
              C
            </small>
            <div class="custom">
            ${data.forecast.forecastday[2].day.condition.text}
            </div>
          </div>
        </div>
    
    
    `
document.getElementById('tables').innerHTML = disp;

}
function formateDate(dateStr){
    let [year, month, day] = dateStr.split('-');
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    month = parseInt(month,10);
    var monthName = monthNames[month-1];
    return `${day} ${monthName}`;   
}
function getWeekdayName(dateStr){
    let [year, month, day] = dateStr.split('-');
    day = parseInt(day, 10);
    month = parseInt(month, 10) - 1; // JavaScript months are 0-based
    const weekdayNames = [  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    let date = new Date(year, month , day);
    var weekdayIndex = date.getDay();
    var weekdayName = weekdayNames[weekdayIndex];
    return weekdayName;
}
function getUserHours(){
let date = new Date()
const currentHour = date.getHours();
return currentHour;
}
var currentHour = getUserHours();
