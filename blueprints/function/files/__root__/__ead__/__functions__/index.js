<% for(var i=0; i < functions.length; i++) {%>
import <%= functions[i] %> from "./<%= functions[i] %>"; <% } %>

// Add the function name as a string so that
// telemetry makes sense after minification
<% for(var i=0; i < functions.length; i++) {%>
<%= functions[i] %>.fn = "<%= functions[i] %>"; <% } %>

export default {   <% for(var i=0; i < functions.length; i++) {%>
    <%= functions[i] %>,   <% } %>
};
