import { testFn, args } from "effects-as-data/test";
import cmds from "../cmds";
import <%= camelEntityName %> from "./<%= camelEntityName %>";

const test<%= pascalEntityName %> = testFn(<%= pascalEntityName %>);

test(
  "<%= camelEntityName %>() should <%= testDescription %>",
  test<%= pascalEntityName %>(() => {

    const todos = [];
    // prettier-ignore
  /*  return args()
      .yieldCmd(cmds.reduxGetState("todos")).yieldReturns(todos)
      .yieldCmd(cmds.setLocal("todos", todos))
      .returns()
      */
  })
);
