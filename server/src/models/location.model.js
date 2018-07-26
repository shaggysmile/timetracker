// location-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const location = new Schema({
    application: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'applications',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: { type: String },
    logo: { type: String },
    location: {
      latitude: {
        type: Number
      },
      longitude: {
        type: Number
      },
      distance: {
        type: Number,
        default: 100
      }
    },
  }, {
    timestamps: true
  });

  return mongooseClient.model('location', location);
};
