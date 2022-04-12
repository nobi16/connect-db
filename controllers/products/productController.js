const Product = require("../../models/product");

exports.getAllProduct = (req, res) => {
    Product.find()
        .exec((error, product) => {
            if (error) {
                return res.status(400).json({
                    message: "NO PRODUCTS FOUND"
                })
            }
            res.json(product)
        })
}

exports.getOwnProductByUid = async (req, res) => {
    const products = await Product.find({ user: req.user._id });
    res.json(products);
}

exports.getProductByBid = async (req, res) => {
    const products = await Product.find({ business_id: req.business_id });
    res.json(products);
}

exports.getProductById = async (req, res) => {
    const singleProduct = await Product.findById(req.params.id);

    if (singleProduct) {
        res.json(singleProduct);
    } else {
        res.status(404).json({ message: "Products not found" });
    }

    res.json(singleProduct);
}

exports.CreateProduct = async (req, res) => {
    const { name, price, info, photo, business_id } = req.body;

    if (!name || !price || !info || !photo || !business_id) {
        return res.status(400).json({
            message: "All Field Are Required"
        })
    } else {
        const product = new Product({user: req.user._id, business_id, name, price, info, photo });

        const createdproduct = await product.save();

        res.status(201).json(createdproduct);
    }
};

exports.getOwnProducts = async (req, res) => {
    const products = await Product.find({ business_id: req.body.business_id });
    res.json(products);
}

exports.getBusinessProducts = async (req, res) => {
    const products = await Product.find({ business_id: req.body.business_id });
    res.json(products);
}


exports.deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    console.log(product);

    if (product) {
        await product.remove();
        return res.status(200).json({
            success: "product Deleted"
        })
    } else {
        return res.status(400).json({
            message: "product Not Deleted"
        })
    }
}


exports.updateProduct = async (req, res) => {
    const { name, price, info, photo, business_id } = req.body;
    // console.log(req);
    if (!name || !price || !info || !photo, !business_id) {
        return res.status(400).json({
            message: "All Field Are Required"
        })
    }

    const product = await Product.findById(req.params.id);
    console.log("product:", product);

    if (product) {
        product.name = name;
        product.price = price;
        product.info = info;
        product.photo = photo;
        product.business_id = business_id;

        const updatedproduct = await product.save();
        res.json(updatedproduct);
    } else {
        return res.status(400).json({
            message: "Service Not Found"
        })
    }
}


exports.CreateProductRating = async (req, res) => {
    console.log(req);
    const { pid, rating, count } = req.body;

    let product = await Product.findById(pid);
    if (product) {
        product.rating = rating,
            product.count = count

        const updatedproduct = await product.save();
        res.json(updatedproduct);
    } else {
        return res.status(400).json({
            message: "product Not Found"
        })
    }
};
