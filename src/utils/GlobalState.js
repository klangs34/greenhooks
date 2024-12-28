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
        moreProduders: []
     });

    return <Provider value={[state, dispatch]} {...props}>{children}</Provider>
}

const useGlobalContext = () => {
    return useContext(GlobalContext);
}

export { GlobalProvider, useGlobalContext }