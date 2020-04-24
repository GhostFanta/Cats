//actions
export const toggleView = () => {
  return {
    type: "components/TOGGLE_VIEW",
  };
};

//reducer
const componentsNormalReducer = (state = {tableView: false}, action) => {
  switch (action.type) {
    case "components/TOGGLE_VIEW":
      return {
        ...state,
        tableView: !state.tableView,
      };
    default:
      return state;
  }
};

export default componentsNormalReducer;
