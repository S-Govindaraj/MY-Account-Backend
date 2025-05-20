const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    bio: {
      type: String,
      trim: true,
    },

    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },

    family: {
      father: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      mother: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      sisters: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      brothers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      spouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      children: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      others: [
        {
          relation: String,
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        },
      ],
    },

    profilePicture: {
      type: String, // file path or URL
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
