import { SAVE_SELECT_OPTION } from '../actions'

const initialState = {
    select: 0
}
export default function (selectReducer = initialState, action) {
    switch (action.type) {
        /* Récupération de la valeur du filtre n°1 */
        case SAVE_SELECT_OPTION:
            return {
                ...selectReducer,
                select: action.payload
            }
        default:
    }
    return selectReducer;
}