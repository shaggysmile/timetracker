const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const { iff, populate, isProvider } = require('feathers-hooks-common');

function normalizePhone(hook, key='phone') {
  return (context) => {
    if (context.type !== 'before') {
      return Promise.reject(new Error(`The 'normalizePhone' hook should only be used as a 'before' hook.`));
    }
    if(context.data && context.data[key]) {
      Object.assign(context.data, {
        [key] : context.data[key].replace(/\D/g,'')
      });
    }
    return context;
  };
}

function pinCodeGenerate(hook, key='pincode') {
  return (context) => {
    if (context.type !== 'before') {
      return Promise.reject(new Error(`The 'normalizePhone' hook should only be used as a 'before' hook.`));
    }
    if(context.data && context.data[key]) {
      Object.assign(context.data, {
        [key] : context.data[key].replace(/\D/g,'')
      });
    }
    return context;
  };
}

module.exports = {
  before: {
    all: [ iff(isProvider('external'),
      authenticate('jwt')
    )],
    find: [ ],
    get: [ ],
    create: [ hashPassword(), normalizePhone()],
    update: [ hashPassword(), ],
    patch: [ hashPassword() ],
    remove: [ ]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
