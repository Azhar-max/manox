const mongoose = require('mongoose');
const Product = require('./src/models/product');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updateGajrayImages() {
  try {
    console.log('[INFO] Updating Gajray product images...');
    
    // Find all Gajray products
    const gajrayProducts = await Product.find({ 
      category: 'floral',
      subcategory: 'gajray'
    });
    
    console.log(`[INFO] Found ${gajrayProducts.length} Gajray products to update`);
    
    // Update each Gajray product to include both images
    for (const product of gajrayProducts) {
      console.log(`[INFO] Updating product: ${product.title}`);
      
      // Set both images for each Gajray product
      product.images = [
        '/assets/products/floral/gajray_1.jpg',
        '/assets/products/floral/gajray_2.jpg'
      ];
      
      await product.save();
      console.log(`[SUCCESS] Updated images for product: ${product.title}`);
    }
    
    console.log('[SUCCESS] All Gajray products updated with both images!');
    
  } catch (error) {
    console.error('[ERROR] Failed to update Gajray images:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('[INFO] Database connection closed');
  }
}

// Run the update
updateGajrayImages().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});