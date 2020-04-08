import _ from 'lodash';

export const createErrorMessageSelector = (actions) => (state) => {
    return _(actions)
        .map((action) => _.get(state, `error.${action}`))
        .compact()
        .first() || '';
};
