const mongoose = require('mongoose');

// Your updated MongoDB URI:
const uri = 'mongodb+srv://laurachepkemoi:1614laura1@tmcluster.1ca04nj.mongodb.net/test?retryWrites=true&w=majority';

console.log('⏳ Attempting to connect...');

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ Connected successfully!');
    mongoose.connection.close();  // Close after testing
  })
  .catch(err => {
    console.error('❌ Connection error:', err.message);
  });





