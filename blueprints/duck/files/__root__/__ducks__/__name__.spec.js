import {
  actions,
  constants,
  reducer
} from './<%= camelEntityName %>'

describe('<%= camelEntityName %>', () => {

  it('<%= dashesEntityName.toUpperCase().replace(/-/g, "_") %> action', () => {

    it('should return payload and type', () => {

      const payload = 'test';

      const expectedAction = {

        type: constants.
        <%= dashesEntityName.toUpperCase().replace(/-/g, "_") %>,
        payload
      };

      expect(actions.
        <%= camelEntityName %> (payload)).toEqual(expectedAction);
    });
  });

  it('reducer', () => {

    it('should return current state', () => {
      let result = reducer(null, {
        type: 'none'
      });

      expect(result).toEqual(null);

      result = reducer([{}], {
        type: 'none'
      });

      expect(result).not.toEqual(null);
      expect(result.length).toEqual(1);
    });

    describe('<%= dashesEntityName.toUpperCase().replace(/-/g, "_") %> reducer', () => {

    });
  });
});
