import { GET_PLACES, ADD_COMMENT } from "../actions"

const initialState = {
    restaurants: []
}
export default function (placesReducer = initialState, action) {
    switch (action.type) {
        /* récupération des Places */
        case GET_PLACES:
            return {
                ...placesReducer,
                restaurants: action.payload
            };
        /* ajout d'un avis sur l'une des Places */
        case ADD_COMMENT:
            let stringRating = action.payload.rating
            let rating = parseFloat(stringRating);

            function renderComment() {
                for (var i = 0; i < placesReducer.restaurants.length; i++) {
                    if (placesReducer.restaurants[i].restaurantName === action.payload.restaurantName) {
                        const newState = [...placesReducer.restaurants];
                        newState[i].ratings =
                            [
                                ...newState[i].ratings,
                                { rating: rating, text: action.payload.text }
                            ];
                        return (newState)

                    }
                }
            }
            let places = renderComment()
            return { restaurants: places }
        default:
    }
    return placesReducer;
}    