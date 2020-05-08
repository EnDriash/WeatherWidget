import React from 'react';
import PropTypes from 'prop-types'
class Carousel extends React.Component {

    render() {

        return (
            <div className="carousel col-11">
                <div className="left-coursor"></div>

                <div className="carousel-content">
                    {this.props.children}

                </div>

                <div className="right-coursor"></div>
            </div>
        );
    }
}

Carousel.propTypes = {
    children: PropTypes.element
}

export default Carousel;