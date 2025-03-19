const { Job } = require("../models");

// List all jobs
exports.listJobs = async (req, res) => {
  const jobs = await Job.findAll();
  res.render("jobs/index", { jobs });
};

// Show job creation form
exports.newJobForm = (req, res) => {
  res.render("jobs/new");
};

// Create a job
exports.createJob = async (req, res) => {
  await Job.create(req.body);
  res.redirect("/jobs");
};

// Show edit job form
exports.editJobForm = async (req, res) => {
  const job = await Job.findByPk(req.params.id);
  res.render("jobs/edit", { job });
};

// Update job
exports.updateJob = async (req, res) => {
  await Job.update(req.body, { where: { id: req.params.id } });
  res.redirect("/jobs");
};

// Delete job
exports.deleteJob = async (req, res) => {
  await Job.destroy({ where: { id: req.params.id } });
  res.redirect("/jobs");
};
