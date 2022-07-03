const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Modal) => {
  return catchAsync(async (req, res, next) => {
    const document = await Modal.findByIdAndDelete(req.params.id);
    if (!document) {
      return next(new AppError('No document found with that id', 404));
    }
    // ** 204 means no content
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
};

exports.updateOne = (Modal) =>
  catchAsync(async (req, res, next) => {
    const doc = await Modal.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // to return updated document
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Modal) =>
  catchAsync(async (req, res, next) => {
    const newdoc = await Modal.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: newdoc,
      },
    });
  });

exports.getOne = (Modal, popOptions) =>
  catchAsync(async (req, res, next) => {
    // ** 200 means ok
    const query = Modal.findById(req.params.id);
    if (popOptions) {
      query.populate(popOptions.path);
    }
    const doc = await query;
    // const doc = await query.populate('reviews');

    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Modal) =>
  catchAsync(async (req, res, next) => {
    // ** To allow nested GET reviews on tour (a small hack for now)
    let filter = {};
    if (req.params.tourId) {
      filter = { tour: req.params.tourId };
    }
    // here find() has no effect although if you are not using filter you must write find()
    const features = new APIFeatures(Modal.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const docs = await features.query.explain();
    const docs = await features.query;

    // ** 200 means ok
    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });
