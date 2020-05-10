import React from 'react';

class Sidebar extends React.Component {

    render() {
        const { category } = this.props

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