import {
    REQUEST_PROPOSAL,
    RECEIVE_PROPOSAL,
    HAS_ERROR_PROPOSAL,
    CLEAR_RESOURCE_BANNER,
    SUBMIT_RESOURCE_SUCCESS
} from "../action-creators/actions";

function blankState(){
    return {
        isFetching: false,
        submitResourceSuccess: false
    };
}

function submitSuccess(state){
    return{
        ...state,
        submitResourceSuccess: true
    }
}

function clear(state) {
    return {
        ...state,
        submitResourceSuccess: false
    }
}

function requestProposal(state, action) {
    return {
        ...state,
        hasError: undefined,
        isFetching: true
    }
}

function receiveProposal(state, action) {
    return {
        ...state,
        isFetching: false,
        item: action.proposal.data,
        lastUpdated: Date.now()
    }
}

function hasErrorProposal(state, action) {
    return {
        ...state,
        isFetching: false,
        hasError: action.error
    }
}


export default function(state = blankState(), action) {
    const actionHandlers = {
        [REQUEST_PROPOSAL]: requestProposal,
        [RECEIVE_PROPOSAL]: receiveProposal,
        [HAS_ERROR_PROPOSAL]: hasErrorProposal,
        [SUBMIT_RESOURCE_SUCCESS]: submitSuccess,
        [CLEAR_RESOURCE_BANNER]: clear
    };

    const reducer = actionHandlers[action.type];

    return reducer ? reducer(state, action) : state;
}