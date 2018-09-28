import { BookTypes } from '../constants';

const initialState = {
    books: [],
    book: {},
    total: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case BookTypes.UPDATE_BOOKS:
            const { total, books } = action.payload;

            return {
                books,
                book: {},
                total
            };
        case BookTypes.RETRIEVE_BOOK:
            return {
                books: [...state.books],
                book: action.payload,
                total: action.total
            };
        default:
            return state;
    }
};
