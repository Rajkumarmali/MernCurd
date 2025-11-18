const { default: mongoose } = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Student = mongoose.model("students", studentSchema);
module.exports = Student;