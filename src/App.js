import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar'
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
        // try {
        //     const position = await this.getUserGeolocation();
        //     const data = await axios.get(
        //         `http://api.openweathermap.org/data/2.5/forecast?lat=${position.lat}&lon=${position.lon}&appid=f98c38ada5226151bb36847c5dd668b8`
        //     );
        //     console.log(data);
        // } catch (err) {
        //     console.error(err);
        // }
    }

    render() {

        return (
            <div className="weather-widget">
                <Sidebar />
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
