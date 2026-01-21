import { dispatchAndWait } from '../helpers';
import { put, race, take } from 'redux-saga/effects';

describe('dispatchAndWait', () => {
  it('should dispatch action and race between success and failure', () => {
    const action = { type: 'REQUEST' };
    const successAction = 'SUCCESS';
    const failureAction = 'FAILURE';
    const generator = dispatchAndWait(action, successAction, failureAction);

    expect(generator.next().value).toEqual(put(action));

    expect(generator.next().value).toEqual(race({
      success: take(successAction),
      failure: take(failureAction),
    }));
  });
});
