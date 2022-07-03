const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const mongoose = require('mongoose');

exports.getOverview = catchAsync(async (req, res, next) => {
  // ** 1) Get tour data from collection
  const tours = await Tour.find();

  // ** 2) Build Template

  // ** 3) Render that template using data tour data from step 1
  res.status(200).render('overview', { title: 'All Tours', tours });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;
  const tour = await Tour.findOne({ slug: slug }).populate({
    path: 'reviews',
    select: 'review rating user',
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name!', 404));
  }

  res.status(200).render('tour', { title: tour.name, tour });
});

exports.login = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  // ** 1) Find all bookings
  const toursBookedByMe = await Booking.find({
    user: req.user.id,
  });

  // ** 2) Find Tours with the returned Ids
  const tourIDs = toursBookedByMe.map(el => el.tour);
  const tours = await Tour.find({
    _id: {$in: tourIDs}
  })

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  })

});

exports.updateUserData = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
};
