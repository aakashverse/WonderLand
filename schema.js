const joi =  require("joi");

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required().min(0),
        image: joi.string().allow("",null),
        geometry: joi.object({
            type: joi.string().valid('Point').required(),
            coordinates: joi.array()
            .items(joi.number())
            .length(2)
            .required()
        })
    }).required(),
});

// module.exports.reviewSchema = joi.object({
//     review: joi.object({
//         rating: joi.number().required().min(1).max(5),
//         comment: joi.string().required(),
//     }).required(),
// });

module.exports.reviewSchema = joi.object({
    rating: joi.number().required().min(1).max(5),
    comment: joi.string().required(),
});