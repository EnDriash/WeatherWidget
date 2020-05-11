import React from 'react';
import axios from 'axios';

import './assets/styles/main.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { getUserGeolocation } from './plugins/getGeolocation';

import Loader from 'react-loader-spinner';
import Sidebar from './components/SideBar';
import Carousel from './components/Carousel';
import Table from './components/Table';

class App extends React.Component {
    state = {
        category: {
            day: {
                value: 'Dzień',
                height: 'height-1'
            },
            hour: {
                value: 'Godzina',
                height: 'height-1'
            },
            forecast: {
                value: 'Prognoza',
                height: 'height-2'
            },
            temperature: {
                value: 'Temperatura',
                height: 'height-7'
            },
            rainfall: {
                value: 'Opady',
                height: 'height-5'
            },
            windDirection: {
                value: 'Kierunek wiatru',
                height: 'height-5'
            },
            windSpeed: {
                value: 'Prędkość wiatru',
                height: 'height-4'
            },
            pressure: {
                value: 'Ciśnienie',
                height: 'height-7'
            }
        },
        weatherData: ''
    };

    async componentDidMount() {
        try {
            const position = await getUserGeolocation();
            const { data } = await axios.get(
                `http://api.openweathermap.org/data/2.5/forecast?lat=${position.lat}&lon=${position.lon}&appid=f98c38ada5226151bb36847c5dd668b8`
            );
            this.setState({ weatherData: data });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const { category, weatherData } = this.state;

        return (
            <div className="weather-widget">
                <div className="specrow">
                    <Sidebar category={category} />
                    {weatherData ? (<Carousel>

                        <Table
                            category={category}
                            weatherData={weatherData}
                        />
                    </Carousel>) : (
                            <Loader
                                className="loader col-11"
                                type="Puff"
                                color="#00BFFF"
                                height={100}
                                width={100}
                                timeout={3000}
                            />
                        )}
                </div>
            </div>
        );
    }
}

export default App;
