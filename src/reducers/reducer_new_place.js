import { ADD_PLACE, ADD_NEW_COMMENT } from "../actions"

const initialState = {
    restaurants: []
}
export default function (newPlacesReducer = initialState, action) {
    switch (action.type) {
        /* ajout d'une nouvelle Place */
        case ADD_PLACE:
            let stringLat = action.payload.lat
            let lat = parseFloat(stringLat);
            let stringLong = action.payload.long
            let long = parseFloat(stringLong);
            let stringRating = action.payload.note
            let rating = parseFloat(stringRating)
            let place = {
                restaurantName: action.payload.restaurantName,
                address: action.payload.address,
                lat: lat,
                long: long,
                rating: rating,
                ratings: [
                    {
                        rating: rating,
                        text: action.payload.avis
                    }
                ]
            }
            let newState = [...newPlacesReducer.restaurants];
            newState = newPlacesReducer.restaurants.concat(place);
            return {
                restaurants: newState
            };

        /* ajout d'un avis sur une nouvelle Place */
        case ADD_NEW_COMMENT:
            let stringNewRating = action.payload.rating
            let newRating = parseFloat(stringNewRating);

            function average(ratings) {
                let nbrStars = [];
                ratings.map(ratings => nbrStars.push(ratings.rating));
                let evaluation = 0;
                for (let i = 0; i < nbrStars.length; i++) {
                    evaluation = evaluation + nbrStars[i]
                }
                let rating = Math.round(evaluation / nbrStars.length);
                return rating
            }

            function renderComment() {
                for (var i = 0; i < newPlacesReducer.restaurants.length; i++) {
                    if (newPlacesReducer.restaurants[i].restaurantName === action.payload.restaurantName) {
                        const newState = [...newPlacesReducer.restaurants];
                        newState[i].ratings =
                            [
                                ...newState[i].ratings,
                                { rating: newRating, text: action.payload.text }
                            ];
                        newState[i].rating = average(newState[i].ratings);
                        return (newState)

                    }
                }
            }
            let places = renderComment()
            return { restaurants: places }


        default:
    }
    return newPlacesReducer;
}    