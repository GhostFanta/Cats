//actions
export const toggleView = () => {
  return {
    type: "components/TOGGLE_VIEW",
  };
};

//reducer
const componentsNormalReducer = (state = {}, action) => {
  switch (action.type) {
    case "components/TOGGLE_VIEW":
      console.log('toggle')
      return {
        ...state,
        tableView: !state.tableView,
      };
    default:
      return state;
  }
};

export default componentsNormalReducer;
