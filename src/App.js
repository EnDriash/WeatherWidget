import React from 'react';
import axios from 'axios';
import moment from 'moment';

import './assets/styles/main.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { getUserGeolocation } from './plugins/getGeolocation';

import Loader from 'react-loader-spinner';
import Sidebar from './components/Sidebar';
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

    getDataDiffer() {
        const { weatherData } = this.state;
        const x = new moment(weatherData.list[0].dt_txt);
        const y = new moment(weatherData.list[1].dt_txt);
        return moment.duration(y.diff(x));
    }

    isSameDay() {
        return this.getDataDiffer().as('day') === 0;
    }

    async componentDidMount() {
        try {
            const position = await getUserGeolocation();
            const { data } = await axios.get(
                `http://api.openweathermap.org/data/2.5/forecast?lat=${position.lat}&lon=${position.lon}&appid=f98c38ada5226151bb36847c5dd668b8`
            );
            this.setState({ weatherData: data });
            console.log(data);
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
                    {weatherData ? (
                        <Carousel>
                            <Table
                                category={category}
                                weatherData={weatherData}
                            />
                        </Carousel>
                    ) : (
                        <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            timeout={3000} //3 secs
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default App;
