<template lang="pug">
  div.home(:class="typeof weather.main !== 'undefined' && weather.main.temp > 20 ? 'warm': ''")
    main.home-wrap
      div.home-container
        div.search-box
          input.search-bar(type="text" placeholder="Enter Country or City Name" v-model="query" @keypress="fetchWeather")
        div.weather-wrap(v-if="typeof weather.main !== 'undefined'")
          div.location-box
            span.loaction {{ weather.name }}, {{ weather.sys.country }}
            span.date {{ date }}
          div.weather-box
            span.temp {{ Math.round(weather.main.temp) }}&#176;c
            span.weather {{ weather.weather[0].main }}
</template>

<script>
// @ is an alias to /src
import moment from 'moment'

export default {
  name: 'Home',

  data () {
    return {
      api_key: '8560b79eed51d63710f73068c3a45d58',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: '',
      date: null
    }
  },
  created () {
    this.dateFormatter()
    if (this.query === '') this.fetchWeather('taiwan')
  },
  methods: {
    fetchWeather (val) {
      if (val.key === 'Enter') {
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&appid=${this.api_key}`)
          .then(res => {
            return res.json()
          }).then(this.setResults)
      } else if (val === 'taiwan') {
        fetch(`${this.url_base}weather?q=taiwan&units=metric&appid=${this.api_key}`)
          .then(res => {
            return res.json()
          }).then(this.setResults)
      }
    },
    setResults (item) {
      this.weather = item
    },
    dateFormatter () {
      const today = new Date()
      this.date = moment(today).format('lll')
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  background-image: url('../assets/cold-bg.jpg');
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100% 100%;
  transition: .4s;
}
.warm {
  background-image: url('../assets/warm-bg.jpg');
}
.home-wrap {
  min-height: 100vh;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, .25), rgba(0, 0, 0, .75))
}
.home-container {
  padding: 20px;
}
.search-box {
  display: flex;
  justify-content: center;
}
.search-box input::-webkit-input-placeholder {
  color: #313131;
}
.search-box input::-ms-input-placeholder {
  color: #313131;
}
.search-box .search-bar {
  max-width: 320px;
  padding: 0 15px;
  font-size: 25px;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  background-color: rgba(255, 255, 255, .5);
  box-shadow: 0 0 8px rgba(0, 0, 0, .25);
  transition: .4s;
}
.search-box .search-bar:focus {
  padding: 0 0 0 10px;
  background-color: rgba(255, 255, 255, .75);
  box-shadow: 0 0 8px rgba(0, 0, 0, .25);
  border-radius: 20px;
}
.location-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
}
.loaction {
  font-size: 32px;
  font-weight: 500;
  text-shadow: 1px 3px rgba(0, 0, 0, .25);
}
.date {
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
}
.weather-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.temp {
  text-align: center;
  padding: 5px 25px;
  font-size: 60px;
  font-weight: 900;
  text-shadow: 3px 6px rgba(0, 0, 0, .25);
  background-color: rgba(255, 255, 255, .25);
  border-radius: 16px;
  margin: 30px 0;
  box-shadow: 3px 6px rgba(0, 0, 0, .25);
}
.weather {
  font-size: 48px;
  font-weight: 700;
  text-shadow: 3px 6px rgba(0, 0, 0, .25);
  font-style: italic;
}
</style>
