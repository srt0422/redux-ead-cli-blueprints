import { combineReducers } from "redux";
import { reducer as form } from 'redux-form';

<% for(var i=0; i < ducks.length; i++) {%>
import <%= ducks[i] %> from "./<%= ducks[i] %>"; <% } %>

export default combineReducers({
  form,
<% for(var i=0; i < ducks.length; i++) {%>
<%= ducks[i] %>, <% } %>
});
