import { AlertTypes } from './../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case AlertTypes.SUCCESS:
            return {
                type: 'is-success',
                message: action.message
            };
        case AlertTypes.ERROR:
            return {
                type: 'is-danger',
                message: action.message
            };
        case AlertTypes.CLEAR:
            return {};
        default:
            return state;
    }
};
