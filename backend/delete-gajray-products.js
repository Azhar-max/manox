const mongoose = require('mongoose');
const Product = require('./src/models/product');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function deleteGajrayProducts() {
  try {
    console.log('[INFO] Deleting Gajray products from the website...');
    
    // Remove all Gajray products
    const deleteResult = await Product.deleteMany({ 
      category: 'floral',
      subcategory: 'gajray'
    });
    
    console.log(`[SUCCESS] Removed ${deleteResult.deletedCount} Gajray products from the database`);
    
    if (deleteResult.deletedCount > 0) {
      console.log('[INFO] Gajray products have been successfully removed from the website');
    } else {
      console.log('[INFO] No Gajray products found in the database');
    }
    
  } catch (error) {
    console.error('[ERROR] Failed to delete Gajray products:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('[INFO] Database connection closed');
  }
}

// Run the deletion
deleteGajrayProducts().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});