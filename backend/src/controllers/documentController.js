// backend/src/controllers/documentController.js

const Document = require('../models/Document'); // We'll create this model next

// Get all documents for the authenticated user
exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ count: documents.length, documents });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching documents' });
  }
};

// Get a single document by ID
exports.getDocumentById = async (req, res) => {
  try {
    const document = await Document.findOne({ _id: req.params.id, user: req.user.id });
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json({ document });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching document' });
  }
};

// Create a new document
exports.createDocument = async (req, res) => {
  try {
    const { title, content, type } = req.body;

    const document = new Document({
      user: req.user.id,
      title,
      content,
      type,
    });

    await document.save();

    res.status(201).json({ message: 'Document created successfully', document });
  } catch (err) {
    res.status(500).json({ error: 'Server error creating document' });
  }
};

// Update an existing document
exports.updateDocument = async (req, res) => {
  try {
    const { title, content, type } = req.body;

    const document = await Document.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content, type },
      { new: true, runValidators: true }
    );

    if (!document) {
      return res.status(404).json({ error: 'Document not found or not authorized' });
    }

    res.json({ message: 'Document updated successfully', document });
  } catch (err) {
    res.status(500).json({ error: 'Server error updating document' });
  }
};

// Delete a document
exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!document) {
      return res.status(404).json({ error: 'Document not found or not authorized' });
    }

    res.json({ message: 'Document deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error deleting document' });
  }
};
