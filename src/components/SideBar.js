import React from 'react';

class Sidebar extends React.Component {

    state = {
        category: {
            day: 'Dzień',
            hour: 'Godzina',
            forecast: 'Prognoza',
            temperature: 'Temperatura',
            rainfall: 'Opady',
            windDirection: 'Kierunek Wiatru',
            windSpeed: 'Prędkosć wiatru',
            pressure: 'Ciśnienie'
        }
    }

    render() {
        const { category } = this.state

        return (
            <div className="sidebar">
                {
                    Object.keys(category).map((elem, indx) => {
                        return (
                            <div className={`sidebar-row ${elem}`} key={indx} >{category[elem]}</div>
                        )
                    })
                }

            </div>
        );
    }
}

export default Sidebar;