const { authenticate } = require('@feathersjs/authentication').hooks;
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
  populate({
    schema: {
      include: {
        service: 'application',
        nameAs: 'application',
        parentField: 'application',
        childField: '_id'
      }
    }
  }),
  populate({
    schema: {
      include: {
        service: 'positions',
        nameAs: 'position',
        parentField: 'position',
        childField: '_id'
      }
    }
  }),
  populate({
    schema: {
      include: {
        service: 'locations',
        nameAs: 'location',
        parentField: 'location',
        childField: '_id'
      }
    }
  }),
  populate({
    schema: {
      include: {
        service: 'employees',
        nameAs: 'employee',
        parentField: 'employee',
        childField: '_id'
      }
    }
  })
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
    find: [...afterHook],
    get: [...afterHook],
    create: [...afterHook],
    update: [...afterHook],
    patch: [...afterHook],
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
