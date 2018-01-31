// Constants

export const constants = {
  <%= dashesEntityName.toUpperCase().replace(/-/g, "_") %>: "<%= dashesEntityName.toUpperCase().replace(/-/g, "_") %>"
};

// Action Creators

function buildAction(type) {
  return function(payload) {
    return {
      type,
      payload
    };
  };
}

export const actions = {
    <%= camelEntityName %>: buildAction("<%= dashesEntityName.toUpperCase().replace(/-/g, "_") %>")
};

// Reducer
export const defaultState = {};

export function reducer(state = defaultState, action) {

  const {type, payload} = action;

  switch (type) {

    case constants.<%= dashesEntityName.toUpperCase().replace(/-/g, "_") %>:
      return payload;

    default: return state;
  }
}

export default reducer;
