import { handlers } from "effects-as-data-universal/es5";
import { buildReduxHandlers } from "effects-as-data-redux";
<% for(var i=0; i < handlers.length; i++) {%>
import * as <%= handlers[i] %>Handler from "./<%= handlers[i] %>"; <% } %>

export default store => ({
  ...buildReduxHandlers(store),
  ...handlers,
  <% for(var i=0; i < handlers.length; i++) {%>
      ...<%= handlers[i] %>,   <% } %>
});
