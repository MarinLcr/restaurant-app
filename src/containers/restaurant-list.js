import React, { Component } from "react";
import { fetchRestaurants } from "../actions/index";
import { fetchPlaces } from "../actions/index";
import { connect } from "react-redux"
import RestaurantListItem from "../components/restaurant-list-item"
import RestaurantListNewItem from "../components/restaurant-list-new-item"
import { createPost } from '../actions/index'



class RestaurantList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lengthNewPlaces: this.props.newPlaces.length
        }
    }
    componentWillMount() {
        this.props.fetchRestaurants();
        this.props.fetchPlaces()
    }

    /* Rendu des nouvelles Places ajoutés */
    addNewPlacesList() {
        if (this.props.newPlaces.length > 0 && this.props.newPlaces.length < 2) {
            return (
                <RestaurantListNewItem key={this.props.newPlaces.restaurantName} restExchange={this.props.newPlaces[0]}
                    streetViewImage={`https://maps.googleapis.com/maps/api/streetview?size=700x250&location=${this.props.newPlaces[0].lat},${this.props.newPlaces[0].long}&fov=90&heading=235&pitch=10&key=AIzaSyDJeT4j-lwP3eOvoC7NsrkSLhCB7GwR8V0`} />
            )
        }
        else if (this.props.newPlaces.length > 1) {
            return (
                <div>
                    {this.props.newPlaces.map(p => (
                        <RestaurantListNewItem key={p.restaurantName} restExchange={p}
                            streetViewImage={`https://maps.googleapis.com/maps/api/streetview?size=700x250&location=${p.lat},${p.long}&fov=90&heading=235&pitch=10&key=AIzaSyDJeT4j-lwP3eOvoC7NsrkSLhCB7GwR8V0`} />
                    ))}
                </div>
            )
        }
    }

    renderSelectCountries() {
        return (
            <div>
                {this.props.places[0].map(p => (
                    <RestaurantListItem key={p.restaurantName} restExchange={p}
                        streetViewImage={`https://maps.googleapis.com/maps/api/streetview?size=700x250&location=${p.lat},${p.lng}&fov=90&heading=235&pitch=10&key=AIzaSyDJeT4j-lwP3eOvoC7NsrkSLhCB7GwR8V0`} />
                ))}
                {this.addNewPlacesList()}
            </div>
        )
    }
    render() {
        return (
            <form>
                {this.renderSelectCountries()}
            </form>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        restaurants: store.restaurantsReducer.restaurants,
        places: [store.placesReducer.restaurants],
        newPlaces: store.newReducerPlaces.restaurants
    }
}

const mapDispatchToProps = {
    fetchRestaurants,
    fetchPlaces,
    createPost
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);

