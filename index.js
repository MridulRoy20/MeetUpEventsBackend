const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connect");
const Event = require("./models/meetup.models");

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Connect to MongoDB
initializeDatabase();

// ----------------------
// Helper functions
// ----------------------

// Create a new event
async function createEvent(eventData) {
  const event = new Event(eventData);
  const savedEvent = await event.save();
  return savedEvent;
}

// Get all events, with optional search and tag filter
async function getEvents({ search, tag }) {
  const query = {};

  if (search) {
    const regex = new RegExp(search, "i"); // case-insensitive
    query.$or = [
      { title: regex },
      { description: regex },
      { location: regex },
    ];
  }

  if (tag) {
    // tags is an array, this will match events that contain this tag
    query.tags = tag;
  }

  const events = await Event.find(query).sort({ createdAt: -1 });
  return events;
}

// Get a single event by id
async function getEventById(id) {
  const event = await Event.findById(id);
  return event;
}

// Add attendee to an event
async function addAttendee(id, attendee) {
  const event = await Event.findById(id);
  if (!event) {
    return null;
  }

  if (!attendee) {
    throw new Error("Attendee name or email is required");
  }

  // Avoid duplicates
  if (!event.attendees.includes(attendee)) {
    event.attendees.push(attendee);
    await event.save();
  }

  return event;
}

// Delete an event
async function deleteEvent(id) {
  const deletedEvent = await Event.findByIdAndDelete(id);
  return deletedEvent;
}

// ----------------------
// Routes
// ----------------------

// Simple health check
app.get("/", (req, res) => {
  res.send("Event Management API is running");
});

// POST /events - create a new event
app.post("/events", async (req, res) => {
  try {
    const { title, description, date, location, tags, imageUrl } = req.body;

    if (!title || !description || !date || !location) {
      return res
        .status(400)
        .json({ error: "title, description, date and location are required" });
    }

    const eventData = {
      title,
      description,
      date,
      location,
      imageUrl: imageUrl || "",
      tags: Array.isArray(tags) ? tags : [],
      attendees: [], // start empty
    };

    const savedEvent = await createEvent(eventData);
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
});

// GET /events - list all events (with optional search and tag)
app.get("/events", async (req, res) => {
  try {
    const { search, tag } = req.query;
    const events = await getEvents({ search, tag });
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// GET /events/:id - get single event details
app.get("/events/:id", async (req, res) => {
  try {
    const event = await getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

// PATCH /events/:id/rsvp - add an attendee
app.patch("/events/:id/rsvp", async (req, res) => {
  try {
    const { attendee } = req.body;

    if (!attendee) {
      return res
        .status(400)
        .json({ error: "Attendee name or email is required" });
    }

    const updatedEvent = await addAttendee(req.params.id, attendee);

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error adding attendee:", error);
    res.status(500).json({ error: "Failed to add attendee" });
  }
});


// DELETE /events/:id - delete an event
app.delete("/events/:id", async (req, res) => {
  try {
    const deletedEvent = await deleteEvent(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Failed to delete event" });
  }
});

// ----------------------
const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log("Server running on port", PORT);
// });
module.exports = app;
