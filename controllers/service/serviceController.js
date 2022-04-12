const Service = require("../../models/service");

exports.getAllService = (req, res) => {
    Service.find()
        .exec((error, service) => {
            if (error) {
                return res.status(400).json({
                    message: "NO SERVICES FOUND"
                })
            }
            res.json(service)
        })
}

exports.getServiceById = async (req, res) => {
    const singleService = await Service.findById(req.params.id);

    if (singleService) {
        res.json(singleService);
    } else {
        res.status(404).json({ message: "services not found" });
    }

    res.json(singleService);
}

exports.CreateService = async (req, res) => {
    const { name, price, info, duration, photo, business_id } = req.body;

    if (!name || !price || !info || !duration || !photo || !business_id) {
        return res.status(400).json({
            message: "All Field Are Required"
        })
    } else {
        const service = new Service({user: req.user._id, business_id, name, price, info, duration, photo });

        const createdService = await service.save();

        res.status(201).json(createdService);
    }
};

exports.getOwnServicees = async (req, res) => {
    const services = await Service.find({ business_id: req.body.business_id });
    res.json(services);
}

exports.getOwnServicesByUid = async (req, res) => {
    const services = await Service.find({ user: req.user._id });
    res.json(services);
}

exports.getServiceByBid = async (req, res) => {
    const products = await Service.find({ business_id: req.business_id });
    res.json(products);
}

exports.deleteService = async (req, res) => {
    const service = await Service.findById(req.params.id);
    console.log(service);

    if (service) {
        await service.remove();
        return res.status(200).json({
            success: "service Deleted"
        })
    } else {
        return res.status(400).json({
            message: "service Not Deleted"
        })
    }
}


exports.updateService = async (req, res) => {
    const { name, price, info, duration, photo, business_id } = req.body;
    // console.log(req);
    if (!name || !price || !info || !duration || !photo, !business_id) {
        return res.status(400).json({
            message: "All Field Are Required"
        })
    }

    const service = await Service.findById(req.params.id);
    console.log("service:", service);

    if (service) {
        service.name = name;
        service.price = price;
        service.info = info;
        service.duration = duration;
        service.photo = photo;
        service.business_id = business_id;

        const updatedService = await service.save();
        res.json(updatedService);
    } else {
        return res.status(400).json({
            message: "Service Not Found"
        })
    }
}


exports.CreateServiceRating = async (req, res) => {
    console.log(req);
    const { sid, rating, count } = req.body;

    let service = await Service.findById(sid);
    if (service) {
        service.rating = rating,
            service.count = count

        const updatedservice = await service.save();
        res.json(updatedservice);
    } else {
        return res.status(400).json({
            message: "service Not Found"
        })
    }
};
