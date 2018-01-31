import { testFn, args } from "effects-as-data/test";
import cmds from "../cmds";
import <%= camelEntityName %> from "./<%= camelEntityName %>";

const test<%= pascalEntityName %> = testFn(<%= pascalEntityName %>);

test(
  "<%= camelEntityName %>() should <%= testDescription %>",
  test<%= pascalEntityName %>(() => {

/* Integration test logic*/
assert.fail();
  })
);
