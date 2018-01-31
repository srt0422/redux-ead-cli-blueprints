<% for(var i=0; i < ducks.length; i++) { %>
import * as <%= ducks[i] %> from "../<%= ducksPathFromActions %>/<%= ducks[i] %>"; <% } %>

export default {  <% for(var i=0; i < ducks.length; i++) { %>
  ...<%= ducks[i] %>.actions,  <% } %>
}
