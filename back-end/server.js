// CHAVE DA API
const keyWeatherAPI = "c2180307fb80e42962e84b60e7fbadf6";

// DATAS WEATHER
async function dataInformation(data) {
   document.querySelector('.city').innerHTML = `${data.name}, ${data.sys.country}`
   document.querySelector('.temperature').innerHTML = `${Math.floor(data.main.temp)}° C`
   document.querySelector('.weather').innerHTML = data.weather[0].description
   document.querySelector('.humidity').innerHTML = `Umidade: ${data.main.humidity}%`
   document.querySelector('.icon-weather').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
}

let erro = document.querySelector('.error')
let information = document.querySelector('.information');

async function searchCity(city) {
   let loading = document.querySelector('.loading-icon')
   loading.style.display = 'block'

   try {
      const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyWeatherAPI}&lang=pt_br&units=metric`)
         .then(res => res.json())
         .then(data => {
            if (data.cod === '404') {
               erro.style.display = 'block'
               erro.innerHTML = 'Cidade não encontrada. Verifique se está correta.'

               information.style.display = 'none'
            } else {
               erro.style.display = 'none'
               information.style.display = 'block'
            }

            dataInformation(data)
         })
         .catch(() => {
            erro.style.display = 'block';
            erro.innerHTML = 'Falha na requisição. Algum problema no servidor.';

            information.style.display = 'none';
         })
   } finally {
      loading.style.display = 'none'
   }
}

document.querySelector('#searchIcon').addEventListener('click', () => {
   const inputText = document.querySelector("#searchText").value.trim();
   const errorMessage = document.querySelector('.error');

   if (inputText === '') {
      errorMessage.style.display = 'block';
      return;
   } else {
      errorMessage.style.display = 'none';
   }

   searchCity(inputText)

   // HIDE THE INFORMATION
   information.style.display = 'block'
})


// KEYBOARD "ENTER"
document.addEventListener('keypress', function (e) {
   if (e.key === 'Enter') {
      let searchIcon = document.querySelector('#searchIcon');

      searchIcon.click()
   }
})

// INPUT NO INFORMATION
