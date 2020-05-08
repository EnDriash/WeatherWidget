import React from 'react';

class Sidebar extends React.Component {

    state = {
        category: {
            day: {
                value: 'Dzień',
                height: 'height-1'
            },
            hour: {
                value: 'Godzina',
                height: 'height-2'
            },
            forecast: {
                value: 'Prognoza',
                height: 'height-2'
            },
            temperature: {
                value: 'Temperatura',
                height: 'height-8'
            },
            rainfall: {
                value: 'Opady',
                height: 'height-5'
            },
            windDirection: {
                value: 'Kierunek Wiatru',
                height: 'height-4'
            },
            windSpeed: {
                value: 'Prędkosć wiatru',
                height: 'height-3'
            },
            pressure: {
                value: 'Ciśnienie',
                height: 'height-8'
            }
        }
    }

    render() {
        const { category } = this.state

        return (
            <div className="sidebar col-1">
                {
                    Object.keys(category).map((elem, indx) => {
                        return (
                            <div className={`sidebar-row ${elem} ${category[elem].height}`} key={indx} >{category[elem].value}</div>
                        )
                    })
                }

            </div>
        );
    }
}

export default Sidebar;