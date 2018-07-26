// schedule-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schedule = new Schema({
    application: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'applications',
      required: true
    },
    location: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'locations',
      required: true
    },
    employee: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'employees',
      required: true
    },
    position: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'positions',
      required: true
    },
    startDate: {
      type: Date,
      default: null
    },
    endDate: {
      type: Date,
      default: null
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('schedule', schedule);
};
