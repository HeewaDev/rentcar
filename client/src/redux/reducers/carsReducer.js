const initialData = {
  cars: [],
};

export const carsReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_ALL_CARS":
      return {
        ...state,
        cars: action.payload, // Set the cars array directly to the action payload
      };
    case "UPDATE_CAR":
      // Logic to update a specific car in the state
      return state; // Return the updated state
    default:
      return state;
  }
};
