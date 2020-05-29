import React, { Component } from "react";
import Average from "./average"
import { saveSelectValue } from '../actions/index'
import { saveSelectValueMore } from '../actions/index'
import { connect } from "react-redux"
import Comment from "../containers/comment-new-form"


class RestaurantListNewItem extends Component {

    constructor(props) {
        super(props);

        this.handler = this.handler.bind(this);

        this.state = {
            average: 0,
            showComponent: false,
            lengthRatings: this.props.restExchange.ratings.length
        }
    }

    componentDidMount() {
        this.setState({ average: this.calcAverage() })
    }

    componentDidUpdate() {
        let voir = this.props.restExchange.ratings.length
        if (voir > this.state.lengthRatings) {
            this.setState({ average: this.calcAverage() })
            this.setState({ lengthRatings: voir })
        }
    }

    handleClick(event) {
        this.setState({
            showComponent: true,
        });
        event.preventDefault();
    }

    handler() {
        this.setState({
            showComponent: false
        });
    }

    /* Calcul de la moyenne du restaurant */
    calcAverage() {
        if (this.props.restExchange.ratings) {
            let nbrStars = [];
            this.props.restExchange.ratings.map(ratings => nbrStars.push(ratings.rating));
            let evaluation = 0;
            for (let i = 0; i < nbrStars.length; i++) {
                evaluation = evaluation + nbrStars[i]
            }
            let average = Math.round(evaluation / nbrStars.length);
            return average
        } else {
        }
    }

    /* Calcul et affichage de la moyenne du restaurant */
    renderAverage() {
        let nbrStars = [];
        this.props.restExchange.ratings.map(ratings => nbrStars.push(ratings.rating));
        let evaluation = 0;
        for (let i = 0; i < nbrStars.length; i++) {
            evaluation = evaluation + nbrStars[i]
        }
        let rating = Math.round(evaluation / nbrStars.length);
        let percent = (rating / 5) * 100
        return (
            <Average average={percent} />
        )
    }
 
    /* Rendu des notes utilisateurs avec le commentaires associé */
    renderRatings() {
        return (
            <React.Fragment>
                {
                    this.props.restExchange.ratings.map(rating => {
                        return (
                            <div className="restau_avis" key={rating.text}>
                                <p>{rating.rating}</p>
                                <p className="restau_comment">{rating.text}</p>
                            </div>
                        )
                    })}
            </React.Fragment>
        )
    }

    /* Affichage des restaurants en fonction du filtre */
    renderTotal() {
        if (this.state.average >= this.props.selectLess && this.state.average <= this.props.selectMore) {
            return (
                <React.Fragment>
                    <div className="container_restau_item">
                        <h2>{this.props.restExchange.restaurantName}</h2>
                        <p className="restau_adress">{this.props.restExchange.address}</p>
                        {this.renderAverage()}
                        <div className="rcontainer_streetview">
                            <img src={this.props.streetViewImage} alt="" />
                        </div>
                        <div className="avis">{this.renderRatings()}</div>
                        <button onClick={(e) => this.handleClick(e)}>Avis</button>
                    </div>
                    {this.state.showComponent ?
                        <Comment action={this.handler} initialValues={{ restaurantName: this.props.restExchange.restaurantName }} /> :
                        null
                    }
                </React.Fragment>
            )
        } else {
        }
    }
 
    render() {
        return (
            <div>{this.renderTotal()}</div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        selectLess: store.selectReducer.select,
        selectMore: store.selectReducerMore.select
    }
}

const mapDispatchToProps = {
    saveSelectValue,
    saveSelectValueMore
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantListNewItem); 