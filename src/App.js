import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
    getUserGeolocation = () => {
        return new Promise((resolve, reject) => {
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            function error() {
                reject('Unable to retrieve your location');
            }

            function success(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                resolve({ lat, lon });
            }

            navigator.geolocation.getCurrentPosition(success, error, options);
        });
    };
    async componentDidMount() {
        try {
            const position = await this.getUserGeolocation();
            const data = await axios.get(
                `http://api.openweathermap.org/data/2.5/forecast?lat=${position.lat}&lon=${position.lon}&appid=f98c38ada5226151bb36847c5dd668b8`
            );
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

    render() {

        const category = {
            day: 'Dzień',
            hour: 'Godzina',
            forecast: 'Prognoza',
            temperature: 'Temperatura',
            rainfall: 'Opady',
            windDirection: 'Kierunek Wiatru',
            windSpeed: 'Prędkosć wiatru',
            pressure: 'Ciśnienie'
        }

        return (
            <div className="weather-widget">
                <div className="sidebar">
                    {
                        Object.keys(category).map((elem, indx) => {
                            return (
                                <div className={`sidebar-row ${elem}`} key={indx} >{category[elem]}</div>
                            )
                        })
                    }

                </div>
                <div className="carousel content">
                    <div className="left-coursor"></div>

                    <div className="content"></div>

                    <div className="right-coursor"></div>
                </div>
            </div>
        );
    }
}

export default App;
