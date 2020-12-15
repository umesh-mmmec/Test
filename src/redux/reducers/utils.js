import types from '../types';
const initState = {
    getUserProfile: null, 
    userImagePath: null,
    todayMeeting:null,
    nextMeeting:null,
};

export default (state = initState, action = null) => {
    switch (action.type) {
        case types.SET_USER_INFO:
            return { ...state, getUserProfile: action.payload }; 
        case types.SET_USER_Image:
            return { ...state, userImagePath: action.payload }; 
        case types.TODAY_MEETING:
            return { ...state, todayMeeting: action.payload }; 
        case types.NEXT_MEETING:
            return { ...state, nextMeeting: action.payload }; 
        default:
            return state;
    }
};
