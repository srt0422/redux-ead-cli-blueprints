import { testFn, args } from "effects-as-data/test";
import cmds from "../cmds";
import <%= camelEntityName %> from "./<%= camelEntityName %>";

const test<%= pascalEntityName %> = testFn(<%= camelEntityName %>);

test(
  "<%= camelEntityName %>() should <%= testDescription %>",
  test<%= pascalEntityName %>(() => {

    return args()
        .yieldCmd(cmds.<%= camelEntityName %>()).yieldReturns()
        .returns();
  })
);
