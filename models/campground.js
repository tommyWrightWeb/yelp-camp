// Importing necessary modules
const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

// Schema for the images associated with the campground
const ImageSchema = new Schema({
    url: String, // URL of the image
    filename: String // Filename of the image
});

// Virtual for generating thumbnail URL of the image
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200'); // Generating thumbnail URL
});

// Options for virtuals in the schema
const opts = { toJSON: { virtuals: true } };

// Schema for the Campground model
const CampgroundSchema = new Schema({
    title: String, // Title of the campground
    images: [ImageSchema], // Array of images associated with the campground
    geometry: { // Geographic coordinates of the campground
        type: {
            type: String,
            enum: ['Point'], // Type of coordinates (only 'Point' supported)
            required: true
        },
        coordinates: { // Latitude and longitude coordinates
            type: [Number],
            required: true
        }
    },
    price: Number, // Price of the campground
    description: String, // Description of the campground
    location: String, // Location of the campground
    author: { // Author of the campground (reference to User model)
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [ // Reviews associated with the campground (reference to Review model)
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts); // Applying options for virtuals

// Virtual property for generating popup markup for map markers
CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong> 
    <p>${this.description.substring(0, 20)}...</p>`; // Generating popup markup
});

// Middleware to delete associated reviews when a campground is deleted
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({ // Deleting associated reviews
            _id: {
                $in: doc.reviews // Finding reviews by their IDs
            }
        })
    }
})

// Exporting the Campground model
module.exports = mongoose.model('Campground', CampgroundSchema);
