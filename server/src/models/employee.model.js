// employee-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const employee = new Schema({
    application: {
      type: mongooseClient.Schema.Types.ObjectId,
      ref: 'applications',
      required: true
    },
    pincode: {type: String, required: true },
    phone: {type: String, required: true },
    profile: {
      firstname: String,
      lastname: String,
      birthday: Date,
      gender: {
        type: String,
        enum: ['male', 'female']
      }
    },
    options: {
      ignoreGeoPosition: { type: Boolean, default:false },
    },
    charge : {
      type: Number,
    },
    accounts: {
      telegram: String
    }
  }, {
    timestamps: true
  });
  return mongooseClient.model('employee', employee);
};
