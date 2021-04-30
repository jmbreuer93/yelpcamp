if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect(
	'mongodb+srv://first-user:7Un8XpKRRsIAhEde@yelpcamp.cqrfc.mongodb.net/yelpcamp?retryWrites=true&w=majority',
	{
		useNewUrlParser    : true,
		useCreateIndex     : true,
		useUnifiedTopology : true
	}
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 500; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author      : '608b77912569c800159f6938',
			location    : `${cities[random1000].city}, ${cities[random1000].state}`,
			title       : `${sample(descriptors)} ${sample(places)}`,
			description :
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, officiis corrupti. Molestiae consequatur veritatis quis. Magnam, corporis! Dolore, labore! Sed ex sapiente nulla consectetur voluptatibus consequuntur dolorem debitis quisquam ducimus.',
			price,
			geometry    : {
				type        : 'Point',
				coordinates : [ cities[random1000].longitude, cities[random1000].latitude ]
			},
			images      : [
				{
					url      :
						'https://res.cloudinary.com/dcxhz0ycf/image/upload/v1619747077/YelpCamp/camp1_tmmfgh.jpg',
					filename : 'YelpCamp/camp1_tmmfgh'
				},
				// {
				// 	url      :
				// 		'https://res.cloudinary.com/dcxhz0ycf/image/upload/v1619747077/YelpCamp/camp2_mhjfva.jpg',
				// 	filename : 'YelpCamp/camp2_mhjfva'
				// },
				{
					url      :
						'https://res.cloudinary.com/dcxhz0ycf/image/upload/v1619747077/YelpCamp/camp3_lbmqfj.jpg',
					filename : 'YelpCamp/camp3_lbmqfj'
				},

				{
					url      :
						'https://res.cloudinary.com/dcxhz0ycf/image/upload/v1619747077/YelpCamp/camp4_hcxn0c.jpg',
					filename : 'YelpCamp/camp4_hcxn0c'
				}
			]
		});
		await camp.save();
	}
	console.log('SEEDING COMPLETE');
};

seedDB().then(() => {
	mongoose.connection.close();
});
