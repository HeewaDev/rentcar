const initialData = {
    loading: false

};

export const alertsReducer = (state = initialData, action) => {
    switch (action.type) {
      case 'loading': {
        return {
          ...state,
          loading: action.payload
        };
      }
      default:
        return state;
    }
  };
  
  export default alertsReducer; // Exporting the reducer as default
  