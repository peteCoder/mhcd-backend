const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    video: { type: mongoose.Schema.Types.Array, ref: "Video" },
    tutorName: String,
    enrolled: Number
    
}, { timestamp: true })

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;