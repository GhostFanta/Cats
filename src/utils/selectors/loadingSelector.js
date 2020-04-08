import _ from 'lodash';

// Return a boolean indicating if loading flag is one of the existing ones.
export const createLoadingSelector = (actions) => (state) => {
    return _(actions).some((action) => _.get(state, `loading.${action}`))
};
