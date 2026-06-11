const express = require('express');
const router = express.Router();
const { getAllJobs, getJobById, createJob } = require('../controllers/jobController');

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', createJob);

module.exports = router;
