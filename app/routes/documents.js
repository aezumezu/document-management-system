const express = require('express'),
  documentRoutes = express.Router(),
  docControl = require('../controllers/documentController'),
  authenticate = require('../middleware/auth'),
  userAccess = require('../middleware/userAccess');

// Creates a new document instance.
documentRoutes.post('/', authenticate, userAccess, docControl.createDocument);

// Find matching instances of document.
documentRoutes.get('/',userAccess, docControl.getDocuments);

// Find document.
documentRoutes.get('/:id', userAccess, docControl.getDocument);

// search through documents
documentRoutes.get('/query', authenticate, userAccess, docControl.searchDocument);

// Update document attributes.
documentRoutes.put('/:id', authenticate, userAccess, docControl.updateDocument);

// Delete document.
documentRoutes.delete('/:id', authenticate, userAccess, docControl.deleteDocument);

module.exports = documentRoutes;