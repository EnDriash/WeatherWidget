import React from 'react';
import axios from 'axios';

import './assets/styles/main.scss';

import { getUserGeolocation } from './plugins/getGeolocation'

import Sidebar from './components/Sidebar'
import Carousel from './components/Carousel'

class App extends React.Component {
    // async componentDidMount() {
    // //     try {
    // //         const position = await getUserGeolocation();
    // //         const data = await axios.get(
    // //             `http://api.openweathermap.org/data/2.5/forecast?lat=${position.lat}&lon=${position.lon}&appid=f98c38ada5226151bb36847c5dd668b8`
    // //         );
    // //         console.log(data);
    // //     } catch (err) {
    // //         console.error(err);
    // //     }
    // // }

    render() {

        return (
            <div className="weather-widget">
                <div className="specrow">
                    <Sidebar />
                    <Carousel>
                    </Carousel>

                </div>
            </div>
        );
    }
}

export default App;
