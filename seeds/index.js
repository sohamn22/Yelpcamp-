const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author:'65f71a63541d6cbb276a8e11',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: "https://source.unsplash.com/collection/483251",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, libero tempore. Earum ipsa est officia quos assumenda!",
            price:price,
            images: [
            
                {
                    url: 'https://res.cloudinary.com/dvbcutwmb/image/upload/v1710688023/Yelpcamp/h1ka8wblookol9czjg0s.jpg',
                    filename: 'Yelpcamp/h1ka8wblookol9czjg0s'
                },
                {
                    url:'https://res.cloudinary.com/dvbcutwmb/image/upload/v1710691578/Yelpcamp/s1vypubbgbgixxsat5qx.jpg',
                    filename: 'Yelpcamp/s1vypubbgbgixxsat5qx'
                }
            ]

        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});

