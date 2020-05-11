import React, { Component } from 'react';

export class Card extends Component {

    render() {
        return (
            <div className="col-6">
                <div className="card">
                    <img alt="img" className="card-img-top" src={ require('../../images/' + this.props.image) }/>
                    <div className="card-body">
                        <h5 className="card-title">{ this.props.title }</h5>
                        <p className="card-text">{ this.props.body }</p>
                    </div>
                </div>
            </div>
        );
    }

}