const mongoose = require('mongoose');
const Product = require('./src/models/product');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/manox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Gajray product data - all priced at 5 euros as requested
const gajrayProducts = [
  {
    title: 'Gajray',
    title_it: 'Gajray',
    description: 'Beautiful floral gajray for special occasions',
    description_it: 'Bellissimi gajray floreali per occasioni speciali',
    price: 5.00,
    category: 'floral',
    subcategory: 'gajray',
    subcategory_it: 'gajray',
    images: [
      '/assets/products/floral/gajray_1.jpg',
      '/assets/products/floral/gajray_2.jpg'
    ],
    isFeatured: false,
    stock: 50
  },
  {
    title: 'Premium Gajray',
    title_it: 'Gajray Premium',
    description: 'Premium quality floral gajray with intricate designs',
    description_it: 'Gajray floreali di qualità premium con disegni intricati',
    price: 5.00,  // Changed to 5 euros as requested
    category: 'floral',
    subcategory: 'gajray',
    subcategory_it: 'gajray',
    images: [
      '/assets/products/floral/gajray_2.jpg',
      '/assets/products/floral/gajray_1.jpg'
    ],
    isFeatured: true,
    stock: 30
  }
];

async function refreshGajrayProducts() {
  try {
    console.log('[INFO] Refreshing Gajray products...');
    
    // Remove all existing Gajray products
    const deleteResult = await Product.deleteMany({ 
      category: 'floral',
      subcategory: 'gajray'
    });
    
    console.log(`[INFO] Removed ${deleteResult.deletedCount} existing Gajray products`);
    
    // Add new Gajray products
    for (const productData of gajrayProducts) {
      const product = new Product(productData);
      await product.save();
      console.log(`[SUCCESS] Added new product: ${product.title}`);
    }
    
    console.log('[SUCCESS] Gajray products refreshed successfully!');
    
    // Verify the new products
    const updatedProducts = await Product.find({ 
      category: 'floral',
      subcategory: 'gajray'
    });
    
    console.log(`[INFO] Verification: Found ${updatedProducts.length} Gajray products in database`);
    updatedProducts.forEach((product, index) => {
      console.log(`  ${index + 1}. ${product.title} - €${product.price}`);
      console.log(`     Images: ${product.images.length}`);
      console.log(`     Featured: ${product.isFeatured}`);
      console.log(`     Stock: ${product.stock}`);
    });
    
  } catch (error) {
    console.error('[ERROR] Failed to refresh Gajray products:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('[INFO] Database connection closed');
  }
}

// Run the refresh
refreshGajrayProducts().then(() => process.exit(0)).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});