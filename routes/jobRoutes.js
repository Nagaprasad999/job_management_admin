const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

// Routes
router.get("/", jobController.listJobs);
router.get("/new", jobController.newJobForm);
router.post("/", jobController.createJob);
router.get("/:id/edit", jobController.editJobForm);
router.post("/:id/update", jobController.updateJob);
router.post("/:id/delete", jobController.deleteJob);

module.exports = router;
