const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');

const router = express.Router();

// router.param('id', tourController.checkID);

router
  .route('/top-5-cheap')
  .get(tourController.aliasCheapTours, tourController.getAllTours);

router
  .route('/top-5-costliest')
  .get(tourController.aliasCostliestTours, tourController.getAllTours);

router
  .route('/top-5-worst')
  .get(tourController.aliasWorstRatedTours, tourController.getAllTours);

router
  .route('/top-5-best')
  .get(tourController.aliasBestRatedTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
