import { GET_RESTAURANTS } from "../actions"

const initialState = {
    restaurants: []
}
export default function (restaurantReducer = initialState, action) {
    switch (action.type) {
        /* Récupération des restaurants du fichiers restaurants.json */
        case GET_RESTAURANTS:
            return {
                ...restaurantReducer,
                restaurants: action.payload
            };


        default:
    }
    return restaurantReducer;
}  