import React from 'react';
import { shallow } from 'enzyme';
import * as assert from "assert";

import <%= pascalEntityName %> from "./<%= camelEntityName %>";

describe('(Component) <%= pascalEntityName %>', () => {
  it('exists', () => {
    const wrapper = shallow( <<%= pascalEntityName %>/ > );});

    
});
