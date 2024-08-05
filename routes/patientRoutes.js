import express from 'express';
import Patient from '../models/patient.js';

const router = express.Router();

// Create a new patient
router.post('/patients', async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).send(patient);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all patients
router.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.find({});
        res.status(200).send(patients);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read a patient by ID
router.get('/patients/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).send();
        }
        res.status(200).send(patient);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a patient by ID
router.put('/patients/:id', async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!patient) {
            return res.status(404).send();
        }
        res.status(200).send(patient);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a patient by ID
router.delete('/patients/:id', async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).send();
        }
        res.status(200).send(patient);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
