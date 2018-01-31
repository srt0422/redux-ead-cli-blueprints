<% for(var i=0; i < components.length; i++) {%>
export {default as <%= components[i].charAt(0).toUpperCase() + components[i].slice(1) %>} from "./<%= components[i] %>";
<% } %>
