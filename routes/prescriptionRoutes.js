import express from 'express';
import prescriptionController from '../controllers/prescriptionController.js';

const router = express.Router();

// Create a new prescription
router.post('/prescriptions', prescriptionController.createPrescription);

// Read all prescriptions
router.get('/prescriptions', prescriptionController.readAll);

// Read a prescription by ID
router.get('/prescriptions/:id', prescriptionController.readPrescription);

// Update a prescription by ID
router.put('/prescriptions/:id', prescriptionController.updatePrescription);

// Delete a prescription by ID
router.delete('/prescriptions/:id', prescriptionController.deletePrescription);

export default router;
