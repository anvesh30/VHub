import {ADD_NEW_RESOURCE, ADD_NEW_RESOURCE_SKILL, REQUEST_HANDLECHANGE, INTIALIZE_REQUEST, REQUEST_USERS, RECEIVE_INTERVIEWERS, RECEIVE_APPROVERS, HAS_ERROR_USERS} from "../action-creators/actions";


function blankState(){
    return {
        requestedBy: '',
        requestDate: '',
        interviewers: [],
        approvers: [],
        jobId: '',
        businessCase: '',
        clientName: '',
        team: '',
        manager: '',
        locationPref: '',
        comments: [],
        requestedResources: [],
        approverOptions:[],
        interviewerOptions:[]
    }
}

function initializeRequest(state, action){
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const requestDate = mm+'/'+dd+'/'+yyyy;
    return {
        ...state,
        requestedBy: action.currentUser,
        requestDate,
    }
}

function addNewResource(state) {
    const resourceRequestDefaultObject = {
        index: state.requestedResources.length,
        number: '',
        compensation: '',
        experience: '',
        skills: []
    }
    state.requestedResources.push(resourceRequestDefaultObject)
    return{
        ...state
    }
}

function addNewSkill(state, action) {
    return{
        ...state,
            requestedResources:[
                ...state.requestedResources.slice(0,action.index),
                {
                    ...state.requestedResources[action.index],
                    skills:[...state.requestedResources[action.index].skills, action.newSkill]
                },
                ...state.requestedResources.slice(action.index+1)
            ]
        }
}

function requestHandleChange(state, action){
    return{
        ...state,
        [action.key]: action.value
    }
}

function requestUsers(state, action) {
    return {
        ...state,
        didInvalidate: false,
        isFetching: true
    }
}

function receiveApprovers(state, action){
    return {
        ...state,
        isFetching: false,
        approverOptions: action.approvers,
    }
}

function receiveInterviewers(state, action){
    return {
        ...state,
        isFetching: false,
        interviewerOptions: action.interviewers,
    }
}

function invalidateUsers(state, action) {
    return {
        ...state,
        isFetching: false,
        didInvalidate: true
    }
}

export default function (state = blankState(), action) {
    const actionHandlers = {
        [ADD_NEW_RESOURCE]: addNewResource,
        [ADD_NEW_RESOURCE_SKILL]:addNewSkill,
        [REQUEST_HANDLECHANGE]: requestHandleChange,
        [INTIALIZE_REQUEST]: initializeRequest,
        [REQUEST_USERS]: requestUsers,
        [RECEIVE_APPROVERS]: receiveApprovers,
        [RECEIVE_INTERVIEWERS]: receiveInterviewers,
        [HAS_ERROR_USERS]: invalidateUsers,
    };

    const reducer = actionHandlers[action.type];

    return reducer ?
        reducer(state, action) :
        state;
}