// position-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const position = new Schema({
    application: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'applications',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    rate: {
      type: Number,
      required: true
    },
    startTime: {
      type: Number,
      required: true
    },
    endTime: {
      type: Number,
      required: true
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('position', position);
};
