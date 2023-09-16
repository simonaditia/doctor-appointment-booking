import User from "../Models/UserSchema.js";

export const updateUser = async (req, res) => {
    const id = req.params.id

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id, {
                $set: req.body
            }, {
                new: true
            }
        ).select("-password")

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedUser
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update"
        })
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id

    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({
            status: true,
            message: "Successfully delete"
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Failed to delete"
        })
    }
}

export const getSingleUser = async (req, res) => {
    const id = req.params.id

    try {
        const user = await User.findById(id).select("-password")

        res.status(200).json({
            success: true,
            message: "User found",
            data: user
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "No user found"
        })
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select("-password")

        res.status(200).json({
            status: true,
            message: "Users Found",
            data: users
        })
    } catch (err) {
        res.status(404).json({
            status: false,
            message: "Not found"
        })
    }
}