const Business = require("../../models/business");

exports.getAllBusiness = (req, res) => {

  Business.find()
    .exec((error, business) => {
      if (error) {
        return res.status(400).json({
          message: "NO BUSINESS FOUND"
        })
      }
      res.json(business)
    })
}

exports.getOwnBusinesses = async (req, res) => {
  const businesses = await Business.find({ user: req.user._id });
  if (businesses) {
    res.json(businesses);
  } else {
    res.status(200).json({ message: "Business not found" });
  }
  res.json(businesses);
};


exports.getBusinessById = async (req, res) => {
  const singleBusiness = await Business.findById(req.params.id);

  if (singleBusiness) {
    res.json(singleBusiness);
  } else {
    res.status(404).json({ message: "Business not found" });
  }

  res.json(singleBusiness);
};


exports.CreateBusiness = async (req, res) => {
  // console.log("req:", req);
  const { name, category, mobile, info, photo, longitude, latitude } = req.body;

  if (!name || !category || !mobile || !info) {
    return res.status(400).json({
      message: "All Field Are Required"
    })
  } else {
    const note = new Business({ user: req.user._id, name, category, mobile, info, photo, longitude, latitude });

    const createdBusiness = await note.save();

    res.status(201).json(createdBusiness);
  }
};

exports.CreateRating = async (req, res) => {
  // console.log(req);
  const { bid, rating, count } = req.body;

  let business = await Business.findById(bid);
  if (business) {
    business.rating = rating,
      business.count = count

    const updatedBusiness = await business.save();
    res.json(updatedBusiness);
  } else {
    return res.status(400).json({
      message: "Business Not Found"
    })
  }
};



exports.deleteBusiness = async (req, res) => {
  const business = await Business.findById(req.params.id);

  if (business.user.toString() !== req.user._id.toString()) {
    return res.status(400).json({
      message: "All Field Are Required"
    })
  }

  if (business) {
    await business.remove();
    return res.status(400).json({
      message: "Business Deleted"
    })
  } else {
    return res.status(400).json({
      message: "Business Not Deleted"
    })
  }
};

exports.updateBusiness = async (req, res) => {
  const { name, category, mobile, info, photo, longitude, latitude } = req.body;

  if (!name || !category || !mobile || !info || !photo || !longitude || !latitude) {
    return res.status(400).json({
      message: "All Field Are Required"
    })
  }

  const business = await Business.findById(req.params.id);

  if (business.user.toString() !== req.user._id.toString()) {
    return res.status(400).json({
      message: "You can't update the business"
    })
  }

  if (business) {
    business.name = name;
    business.category = category;
    business.mobile = mobile;
    business.photo = photo;
    business.longitude = longitude;
    business.latitude = latitude;
    business.info = info

    const updatedBusiness = await business.save();
    res.json(updatedBusiness);
  } else {
    return res.status(400).json({
      message: "Business Not Found"
    })
  }
};

// exports.CreateBusiness = (req, res) => {
//   const upload = multer({ dest: 'images/' })
//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true;

//     form.parse(req, (err, fields, file) => {
//       if (err) {
//         return res.status(400).json({
//           error: "problem with image"
//         });
//       }
//       //destructure the fields
//       const { name, category, mobile } = fields;

//       if (!name || !category || !mobile) {
//         return res.status(400).json({
//           error: "Please include all fields"
//         });
//       }

//       let product = new Business(fields);

//       //handle file here
//       console.log(file);
//       if (file.photo) {
//         if (file.photo.size > 3000000) {
//           return res.status(400).json({
//             error: "File size too big!"
//           });
//         }
//         product.photo.data = fs.readFileSync(file.photo.filepath);
//         product.photo.contentType = file.photo.type;
//       }

//       //save to the DB
//       product.save((err, product) => {
//         if (err) {
//           res.status(400).json({
//             error: "Saving tshirt in DB failed"
//           });
//         }
//         res.json(product);
//       });
//     });
//   };

