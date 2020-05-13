import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Arrow } from '../assets/media/icons/arrow.svg';

class Carousel extends React.Component {

    state = {
        xpoint: null,
    }

    startDrag = (event) => {
        const scrollbar = document.querySelector('.carousel .scrollbar')
        const dragRegister = document.querySelector('.carousel .dragRegister')
        if(event.target.className === 'dragRegister') {
            dragRegister.addEventListener('mousemove', this.contentManager, false)
        } else {
            scrollbar.addEventListener('mousemove', this.scrollBarManager, false)
        }
    }

    endDrag = (event) => {
        const scrollbar = document.querySelector('.carousel .scrollbar')
        const bar = document.querySelector('.carousel .scrollbar .bar')
        const carouselContentChild = document.querySelector('.carousel-content *:first-child')
        const dragRegister = document.querySelector('.carousel .dragRegister')

        if(event.target.className === 'dragRegister') {
            dragRegister.removeEventListener('mousemove', this.contentManager, false)
        } else {
            scrollbar.removeEventListener('mousemove', this.scrollBarManager, false)
        }

        bar.style.left = `${this.interpolation(bar.offsetLeft, scrollbar.offsetWidth)}px`
        carouselContentChild.style.left = `${this.interpolation(carouselContentChild.offsetLeft, carouselContentChild.offsetWidth)}px`
    }

    interpolation(value, containerWidth) {
        const elementDeltaWidth = containerWidth / this.props.elements

        return (Math.round(value / elementDeltaWidth) * elementDeltaWidth).toFixed(0)

    }

    scrollBarManager = (event) => {

        const carousel = document.querySelector('.carousel')
        const scrollbar = document.querySelector('.carousel .scrollbar')
        const bar = document.querySelector('.carousel .scrollbar .bar')
        const carouselContentChild = document.querySelector('.carousel-content *:first-child')

        const moveX = event.clientX - carousel.offsetLeft - bar.offsetWidth / 2;
        const endpoint = carousel.offsetWidth - bar.offsetWidth

        if (moveX < 0) {
            bar.style.left = `0px`
            carouselContentChild.style.left = `0px`
        }

        else if (moveX <= endpoint) {
            this.setState({ xpoint: moveX })
            bar.style.left = `${this.state.xpoint}px`
            carouselContentChild.style.left = `${-(carouselContentChild.offsetWidth - carousel.offsetWidth/2) * (this.state.xpoint / carousel.offsetWidth)}px`
        }

        else {
            this.setState({ xpoint: endpoint })
            bar.style.left = `${endpoint}px`
            carouselContentChild.style.left = `${-(carouselContentChild.offsetWidth)}`
        }
    }

    contentManager = (event) => {

        const carousel = document.querySelector('.carousel')
        const scrollbar = document.querySelector('.carousel .scrollbar')
        const bar = document.querySelector('.carousel .scrollbar .bar')
        const carouselContentChild = document.querySelector('.carousel-content *:first-child')

        const moveX = event.clientX - carousel.offsetLeft - bar.offsetWidth / 2;
        const endpoint = carousel.offsetWidth - bar.offsetWidth

        if (moveX < 0) {
            bar.style.left = `0px`
            carouselContentChild.style.left = `0px`
        }

        else if (moveX <= endpoint) {
            this.setState({ xpoint: moveX })
            bar.style.left = `${this.state.xpoint}px`
            carouselContentChild.style.left = `${-(carouselContentChild.offsetWidth - carousel.offsetWidth) * (this.state.xpoint / scrollbar.offsetWidth)}px`
        }

        else {
            this.setState({ xpoint: endpoint })

            bar.style.left = `${endpoint}px`
            carouselContentChild.style.left = `${-(carouselContentChild.offsetWidth)}`
        }
    }



    componentDidMount() {

        const carousel = document.querySelector('.carousel')
        const carouselContent = document.querySelector('.carousel-content')
        const carouselContentChild = document.querySelector('.carousel-content *:first-child')
        const dragRegister = document.querySelector('.carousel .dragRegister')

        const scrollbar = document.querySelector('.carousel .scrollbar')
        const bar = document.querySelector('.carousel .scrollbar .bar')

        const leftCoursor = document.querySelector('.carousel .left-coursor')
        const rightCoursor = document.querySelector('.carousel .right-coursor')

        const percentOfLargeScrollView = carouselContentChild.offsetWidth / carousel.offsetWidtht
        const elementDeltaWidth = percentOfLargeScrollView * carousel.offsetWidtht

        bar.style.width = `${elementDeltaWidth}px`

    }

    render() {

        return (
            <div className="carousel col-11">
                <div className="left-coursor"><Arrow /></div>

                <div className="carousel-content"  >{this.props.children}</div>

                <div className="right-coursor"><Arrow /></div>
                <div className="scrollbar" onMouseUp={event => this.endDrag(event)} onMouseDown={event => this.startDrag(event)} >
                    <div className="bar"></div>
                </div>
                <div className="dragRegister"  onMouseUp={event => this.endDrag(event)} onMouseDown={event => this.startDrag(event)} ></div>
            </div>
        );
    }
}

Carousel.propTypes = {
    children: PropTypes.element,
    elements: PropTypes.number
};

export default Carousel;
