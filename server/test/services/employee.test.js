const assert = require('assert');
const app = require('../../src/app');

describe('\'employee\' service', () => {
  it('registered the service', () => {
    const service = app.service('employees');

    assert.ok(service, 'Registered the service');
  });
});
