module.exports = function(app) {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the
    // anonymous channel
    // app.channel('anonymous').join(connection);
  });

  app.on('login', (user, { connection }) => {

    if(connection) {
      app.channel(`${connection.payload.userId}`).join(connection);
    }
  });

  app.publish((data, hook) => { // eslint-disable-line no-unused-vars
    const appId = hook.params && hook.params.user && hook.params.user._id || data && data.application._id
    if(appId) {
      return app.channel(`${appId.toString()}`).send(data);
    }
  });
};
