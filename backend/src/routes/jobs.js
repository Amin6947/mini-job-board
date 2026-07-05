const express = require('express');
const router = express.Router();
const { getAllJobs, getJobById, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', verifyToken, requireRole('employer', 'admin'), createJob);
router.put('/:id', verifyToken, requireRole('employer', 'admin'), updateJob);
router.delete('/:id', verifyToken, requireRole('employer', 'admin'), deleteJob);

module.exports = router;
