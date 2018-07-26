// apps-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const application = new mongooseClient.Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    pincode: {
      type: String,
      unique: true
    },
    phone: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    company: {
      name: { type: String, required: true },
      logo: { type: String },
    },
    // ISO 639
    lang: {
      type: String,
      required: true,
      default: 'ru'
    },
    timezone: {
      type: String,
      required: true,
      default: 'Asia/Tashkent'

    },
    // ISO 4217
    currency: {
      name: {
        type: String,
        required: true,
        default: 'UZS'
      },
      code: {
        type: String,
        required: true,
        default: 'UZS'
      }
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('application', application);
};
