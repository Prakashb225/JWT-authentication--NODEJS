const express = require('express');
const { getgoals, postgoals, putgoals, deletegoals } = require('../controllers/goalsController');
const {protect} = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get(protect,getgoals).post(protect ,postgoals);
router.route('/:id').put(protect,putgoals).delete(protect,deletegoals);

module.exports = router;