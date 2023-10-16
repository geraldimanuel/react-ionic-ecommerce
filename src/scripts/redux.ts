const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    value: 0,
}

// Reducer (Ubah value / update store)
const rootReducer = (state:any, action:any) => {
    console.log(action);

    // if(action.type === 'ADD_AGE'){
    //     return {
    //         ...state,
    //         value: state.value + 1
    //     }
    // }
    // if(action.type === 'CHANGE_VALUE'){
    //     return {
    //         ...state,
    //         value: state.value + action.newValue
    //     }
    // }
    // return state;
    switch(action.type){
        case 'ADD_AGE':
            return {
                ...state,
                value: state.value + 1
            }
        case 'CHANGE_VALUE':
            return {
                ...state,
                value: state.value + action.newValue
            }
        default:
            return state;
    }
}

// Store (Simpan value secara global)
const store = createStore(rootReducer);
console.log(store.getState());


// Subscribe (Mendapatkan value dari store)
store.subscribe(() => {
    console.log('store change: ', store.getState());
})

// Dispatch (Mengirim action ke reducer)
store.dispatch({type: 'ADD_AGE'});
store.dispatch({type: 'CHANGE_VALUE', newValue: 12});
console.log(store.getState());