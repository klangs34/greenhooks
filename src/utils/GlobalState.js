import React, { useReducer, useContext, createContext } from 'react';

const reducer = (state, action) => {
    //console.log(action.payload)
    switch (action.type) {
        case "update_top_producers":
            return {...state, topProducers: action.payload.topProducers}
        case "update_top_rated_beats":
            return {...state, topRatedBeats: action.payload.topRatedBeats}
        case "update_more_producers":
            return {...state, moreProducers: action.payload.moreProducers}
        case "update_site_members":
            return {...state, siteMembers: action.payload.siteMembers}
        case "update_about_me":
            return {...state, aboutMe: action.payload.aboutMe}
        case "update_beat_table":
            return {...state, beatTable: action.payload.beatTable}
        // case "update_more_producers":
        //     return {...state, moreProducers: action.payload.moreProducers}
        default:
            return state;
    }
}

const GlobalContext = createContext();
const { Provider } = GlobalContext;

const GlobalProvider = ({ children, ...props }) => {
    const [state, dispatch] = useReducer(reducer, { 
        topProducers: [],
        topRatedBeats: [],
        moreProduders: [],
        siteMembers: [],
        aboutMe: [],
        beatTable: []
     });

    return <Provider value={[state, dispatch]} {...props}>{children}</Provider>
}

const useGlobalContext = () => {
    return useContext(GlobalContext);
}

export { GlobalProvider, useGlobalContext }