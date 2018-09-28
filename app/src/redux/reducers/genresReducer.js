import { GenresTypes } from '../constants';

const initialState = {
    genres: [],
    genre: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GenresTypes.UPDATE_GENRES:
            const genres = action.payload;

            return {
                genres,
                genre: {}
            };
        case GenresTypes.RETRIEVE_GENRE:
            return {
                genres: [...state.genres],
                genre: action.payload
            };
        default:
            return state;
    }
};
