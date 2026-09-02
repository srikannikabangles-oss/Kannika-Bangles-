const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  try {
    const dbConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config', 'db.json'), 'utf8'));
    MONGODB_URI = dbConfig.DB_CONNECTION_STRING;
  } catch (err) {
    MONGODB_URI = "mongodb+srv://srikannikabangles_db_user:EvGQmjlBJeWm5bCn@cluster0.kixh6yd.mongodb.net/kannika_bangles?retryWrites=true&w=majority&appName=Cluster0";
  }
}

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true }
}, { strict: false });

const inquirySchema = new mongoose.Schema({
  id: { type: String, required: true }
}, { strict: false });

const Order = mongoose.model('Order', orderSchema);
const Inquiry = mongoose.model('Inquiry', inquirySchema);

async function clearData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const ordersDeleted = await Order.deleteMany({});
    console.log(`Deleted ${ordersDeleted.deletedCount} orders.`);

    const inquiriesDeleted = await Inquiry.deleteMany({});
    console.log(`Deleted ${inquiriesDeleted.deletedCount} inquiries.`);

    await mongoose.disconnect();
    console.log('✅ Successfully removed all inquiries and orders!');
  } catch (err) {
    console.error('Error clearing data:', err);
    process.exit(1);
  }
}

clearData();
