const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Get all contacts
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

// Create a new contact
const createContact = asyncHandler(async (req, res) => {
  console.log("Received request body:", req.body);

  const { name, email, phone } = req.body;

  // Validate required fields
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const contact = await Contact.create({ name, email, phone });
  res.status(201).json({
    message: "Contact created successfully",
    contact,
  });
});

// Get a specific contact by ID
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`Contact not found with ID ${req.params.id}`);
  }
  res.status(200).json(contact);
});

// Update a contact by ID
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`Contact not found with ID ${req.params.id}`);
  }
  
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    message: "Contact updated successfully",
    updatedContact,
  });
});

// Delete a contact by ID
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`Contact not found with ID ${req.params.id}`);
  }

  res.status(200).json({
    message: `Contact with ID ${req.params.id} deleted successfully.`,
  });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
