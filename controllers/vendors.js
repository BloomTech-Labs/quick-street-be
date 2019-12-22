const Vendor = require('../models/Vendors');
const auth = require('../middleware/auth');
const ErrorResponse = require('../utils/errorResponse'); // allows custom error responses
const asyncHandler = require('../middleware/async'); // keeps code DRY

exports.getAllVendors = asyncHandler(async (req, res, next) => {
  const vendors = await Vendor.find();

  res.status(200).json({ success: true, data: vendors });

  res.status(400).json({ success: false });
});

exports.getVendor = asyncHandler(async (req, res, next) => {
  const vendor = await Vendor.findById(req.params.id);

  if (!vendor) {
    return next(
      new ErrorResponse(`Vendor not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: vendor });
});

exports.createVendor = asyncHandler(async (req, res, next) => {
  const { email, password, address, business_name } = req.body;

  const vendor = await Vendor.create({
    email,
    password,
    address,
    business_name
  });
  const token = await vendor.getSignedJwtToken();
  res.status(201).send({ vendor, token });
});

exports.updateVendor = asyncHandler(async (req, res, next) => {
  const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!vendor) {
    return next(
      new ErrorResponse(`Vendor not found with the id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: vendor });
});

exports.deleteVendor = asyncHandler(async (req, res, next) => {
  const vendor = await Vendor.findById(req.params.id);
  if (!vendor) {
    return next(
      new ErrorResponse(`Vendor not found with id of ${req.params.id}`, 404)
    );
  }

  vendor.remove();

  res.status(200).json({ success: true, data: {} });
});
