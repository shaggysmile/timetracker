const { authenticate } = require('@feathersjs/authentication').hooks;
const { iff, isProvider } = require('feathers-hooks-common');
const { restrictToOwner, queryWithCurrentUser} = require('feathers-authentication-hooks');

const beforeHooks = [
  iff(isProvider('external'),
    authenticate('jwt')
  ),
  queryWithCurrentUser({idField: '_id', as: 'application'}),
  restrictToOwner({ownerField: 'application'})
];

module.exports = {
  before: {
    all: [ ...beforeHooks],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
