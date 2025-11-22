const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    // Basic required fields as per assignment
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },

    // Optional image just for UI
    imageUrl: {
      type: String,
    },

    // Tags and attendees
    tags: [
      {
        type: String,
      },
    ],
    attendees: [
      {
        type: String, // simple: store attendee name or email as string
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
