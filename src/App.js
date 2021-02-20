import React from 'react';
import CityInput from "./components/CityInput";
import BodyImage from '../src/images/cloud-image.jpg';
import styled from "@emotion/styled";

const breakpoints = [576, 768, 992, 1200];
const mq = breakpoints.map(
    bp => `@media (min-width: ${bp}px)`
);


const WeatherContainer = styled.div `
    background-image: linear-gradient(#dd99bb7a, #ead7d1b5), url(${BodyImage});
    height: 100vh;
`;

const Latitude = styled.div`
    padding: 10px;
    & span {
        margin-top: 2px;
        margin-bottom: 0;
        font-size: 1rem;
        padding-left: 5px;
    }
`;

const Lat = styled.h5`
    font-size: 1.2rem;
    margin-top: 5px;
    margin-bottom: 0;
`;

const Weather = styled.h4`
    text-transform: capitalize;
    margin-top: 0;
    font-size: 25px;
`;

const CityName = styled.h1`
    fontSize: '40px';
    margin-bottom: 0;
`;

const WeatherInfo = styled.div`
    width: 70%;
    text-align: center;
    transform: translate(-50%, -50%);
    display: block;
    position: absolute;
    left: 50%;
    top: 50%; 
    padding: 1.5rem;
     ${mq[0]} {
     color: green;
     box-shadow: 0 2.8px 2.2px rgb(0 0 0 / 54%);
     padding: 4rem;
     backdrop-filter: blur(45px);
     } 
`
;

const TempWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    & img {
    width: 30%;
        ${mq[1]} {
            width: 10%;
        }
    }
}
`;

const Temp = styled.h1`
    font-size: 3rem;
`;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: 'London',
    };
  }

  cityDisplay;

  displayDate = () => {
    let today = new Date();
    let todayDate = today.toLocaleDateString('en', { month: "long", year: "numeric", day: "numeric"});
    return todayDate;
  } ;

  handleChange = (event) => {
    this.cityDisplay = event.target.value;
  };

  handleSubmit = (e) => {
    console.log(this.cityDisplay);
    e.preventDefault();
    this.setState({city: this.cityDisplay, pageLoading: false}, () => {this.updateInfo()});
  };



  updateInfo = () => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    let cityName = this.state.city;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        .then(function (response) {
          return response.json()
        })
        .then((data) => {
          this.setState({
            city: data.name,
            lat: data.coord.lat,
            long: data.coord.lon,
            country: data.sys.country,
            temperature: data.main.temp,
            weather: data.weather[0].description,
            icon: data.weather[0].icon,
          });
          if(data.cod === 404){
            this.setState({
              errorMessage: data.message,
              pageLoading: true,
            });
          }
          console.log(data.cod)
        })
        .catch((error) => {
          if(error.message === 'Failed to fetch'){
            this.setState({
              errorMessage: "You seem to have encountered issues with your internet connectivity, please check and try again",
              pageLoading: true,
            });
          } else {
            this.setState({
              errorMessage: "I am not sure you entered a valid city. Try something else like New York or London",
              pageLoading: true,
            });
          }
          console.log(error);
        });

    console.log("got here")
  };

  componentDidMount() {
    this.updateInfo();
  }


  render () {
    const dataset = this.state;
    return (
        <WeatherContainer>
          <WeatherInfo>
            <div>
              <CityInput handleChange={this.handleChange} handleSubmit={this.handleSubmit} city={dataset.city}/>
            </div>
            <div>
              {
                dataset.pageLoading
                    ?   <p style={{color: 'red'}}>{dataset.errorMessage}</p>
                    :   <div>
                      <CityName>{dataset.city}, {dataset.country}</CityName>
                      <TempWrapper>
                        <img src={`http://openweathermap.org/img/w/${dataset.icon}.png`} alt={dataset.weather}/>
                        <Temp >{Math.round(dataset.temperature)}&#8451;</Temp>
                      </TempWrapper>
                      <Weather style={{FontSize: '1.2rem'}}>{dataset.weather}</Weather>
                      <h3>{this.displayDate()}</h3>
                      <Latitude>
                        <Lat>Latitude:<span>{(Math.round(dataset.lat * 100) / 100).toFixed(2)}</span></Lat>
                      </Latitude>
                      <Latitude>
                        <Lat>Longitude: <span>{(Math.round(dataset.long * 100) / 100).toFixed(2)}</span></Lat>
                      </Latitude>
                    </div>
              }
            </div>
          </WeatherInfo>
        </WeatherContainer>
    );
  }
}

export default App;
