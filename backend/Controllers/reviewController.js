import Review from "../Models/ReviewSchema.js"
import Doctor from "../Models/DoctorSchema.js"

// get all reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({})

        res.status(200).json({
            status: true,
            message: "Successful",
            data: reviews
        })
    } catch (err) {
        res.status(404).json({
            status: false,
            message: "Not found"
        })
    }
}

// create review
export const createReview = async (req, res) => {
    if (!req.body.doctor) req.body.doctor = req.params.doctorId
    if (!req.body.user) req.body.user = req.params.userId

    const newReview = new Review(req.body)

    try {
        const savedReview = await newReview.save()
        await Doctor.findByIdAndUpdate(req.body.doctor, {
            $push: {
                reviews: savedReview._id
            }
        })

        res.status(200).json({
            status: true,
            message: "Review submitted",
            data: savedReview
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}