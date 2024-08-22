import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
    collegeCode: {
        type: String,
        unique: true,
        required: true,
    },
    collegeName: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export const College = mongoose.models.College || mongoose.model('College', collegeSchema);
