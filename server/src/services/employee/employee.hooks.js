const {authenticate} = require('@feathersjs/authentication').hooks;
const { iff, populate, isProvider } = require('feathers-hooks-common');
const { restrictToOwner, queryWithCurrentUser} = require('feathers-authentication-hooks');

const beforeHooks = [
  iff(isProvider('external'),
    authenticate('jwt')
  ),
  queryWithCurrentUser({idField: '_id', as: 'application'}),
  restrictToOwner({ownerField: 'application'})
];
const afterHook = [
  iff(isProvider('external'),
    authenticate('jwt')
  ),
  populate({
    schema: {
      include: {
        service: 'application',
        nameAs: 'application',
        parentField: 'application',
        childField: '_id'
      }
    }
  })
];
module.exports = {
  before: {
    all: [...beforeHooks],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [...afterHook],
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
