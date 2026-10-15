// backend/seedRights.js

const mongoose = require('mongoose');
const Right = require('./src/models/Right'); // import the Right model

const seedRights = async () => {
  try {
    // Connect to MongoDB (use your .env MONGO_URI if available)
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mwananchi', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Rights dataset
    const rights = [
      {
        title: 'Employment Rights',
        description: 'Fair wages, contracts, workplace protections.',
        content: 'Kenyan labor law guarantees minimum wage, safe working conditions, and protection against unfair dismissal...',
      },
      {
        title: 'Family Law',
        description: 'Marriage, custody, inheritance rights.',
        content: 'Family law covers marriage, divorce, child custody, and inheritance matters under Kenyan statutes...',
      },
      {
        title: 'Property Law',
        description: 'Land ownership, tenancy, property disputes.',
        content: 'Property law governs land ownership, tenancy agreements, and dispute resolution mechanisms...',
      },
    ];

    // Clear existing and insert fresh
    await Right.deleteMany({});
    await Right.insertMany(rights);

    console.log('✅ Rights seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error seeding rights:', err);
    mongoose.connection.close();
  }
};

seedRights();
