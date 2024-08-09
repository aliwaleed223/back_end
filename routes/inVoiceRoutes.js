import Invoice from '../models/inVoice.js'; // Ensure correct model name and path
import express from 'express';

const router = express.Router();

// Create Invoice
router.post('/invoice', async (req, res) => {
    try {
        console.log(req.body);
        
        const newInvoice = new Invoice(req.body);
        await newInvoice.save();
        res.status(201).send(newInvoice); // 201 Created for successful creation
    } catch (error) {
        res.status(400).send(error); // 400 Bad Request for errors
    }
});

// Read All Invoices
router.get('/allInvoices', async (req, res) => {
    try {
        const allInvoices = await Invoice.find({});
        res.status(200).send(allInvoices); // 200 OK for successful retrieval
    } catch (error) {
        res.status(400).send(error);
    }
});

// Fetch Single Invoice
router.get('/fetchInvoice/:id', async (req, res) => {
    try {
        const getInvoice = await Invoice.findById(req.params.id);
        if (!getInvoice) {
            return res.status(404).send(); // 404 Not Found if no invoice is found
        }
        res.status(200).send(getInvoice);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update Invoice
router.put('/invoice/:id', async (req, res) => {
    try {
        const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedInvoice) {
            return res.status(404).send(); // 404 Not Found if invoice not found
        }
        res.status(200).send(updatedInvoice); // Corrected variable name
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete Invoice
router.delete('/invoice/:id', async (req, res) => {
    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!deletedInvoice) {
            return res.status(404).send(); // 404 Not Found if invoice not found
        }
        res.status(200).send(deletedInvoice);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;
