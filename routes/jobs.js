const express = require("express");
const router = express.Router();
const { Job } = require("../models"); // Import Job model

// GET: Show Edit Form
router.get("/:id/edit", async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) {
            return res.status(404).send("Job not found");
        }
        res.render("jobs/edit", { job });
    } catch (error) {
        res.status(500).send("Error loading job");
    }
});

// PUT: Update Job
// PUT: Update a Job
// PUT: Update a Job
router.put("/:id", async (req, res) => {
    try {
        const { title, company, location, jobType, salary, description, requirements, responsibilities, deadline } = req.body;
        
        await Job.update(
            { title, company, location, jobType, salary, description, requirements, responsibilities, deadline },
            { where: { id: req.params.id } }
        );

        res.redirect("/jobs"); // Redirect to job listings after update
    } catch (error) {
        res.status(500).send("Error updating job");
    }
});



// DELETE: Remove a Job
router.delete("/:id", async (req, res) => {
    try {
        await Job.destroy({ where: { id: req.params.id } });
        res.redirect("/jobs");
    } catch (error) {
        res.status(500).send("Error deleting job");
    }
});

