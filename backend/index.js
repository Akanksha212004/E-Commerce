// require("dotenv").config();

// // const port = 4000;
// const port = process.env.PORT || 4000;
// const express = require("express");
// const app = express();

// app.set('trust proxy', true);

// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");

// // Adding cloudinary
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("./config/cloudinary");

// const path = require("path");
// const cors = require("cors");

// const fs = require("fs");

// if (!fs.existsSync("./upload/images")) {
//     fs.mkdirSync("./upload/images", { recursive: true });
// }

// app.use(express.json());
// // app.use(cors());
// app.use(cors({
//   origin: "*",
//   methods: ["GET","POST","PUT","DELETE"],
//   allowedHeaders: ["Content-Type","Authorization","auth-token"]
// }));

// // Database Connection with MongoDB
// // mongoose.connect("mongodb+srv://greatStackEcommerce:Kajal*1307@cluster0.lrrewte.mongodb.net/e-commerce");
// mongoose.connect(process.env.MONGO_URI);

// // API Creation

// app.get("/", (req, res) => {
//     res.send("Express App is Running");
// });

// // // Image Storage Engine
// // const storage = multer.diskStorage({
// //     destination: './upload/images',
// //     filename: (req, file, cb) => {
// //         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
// //     }
// // });

// // Cloudinary Storage Engine
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "products",
//     allowed_formats: ["jpg", "png", "jpeg"]
//   }
// });

// const upload = multer({storage:storage});

// // // Creating Upload Endpoint for images
// // app.use('/images', express.static('upload/images'));

// app.post("/upload", upload.single('product'), (req, res)=>{
//     res.json({
//         success: 1,
//         // image_url: `http://localhost:${port}/images/${req.file.filename}`
//         // image_url: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
//         image_url: req.file.path
//     });
// });

// // Schema for Creating products
// const Product = mongoose.model("Product",{
//     id:{
//         type:Number,
//         required:true,
//     },
//     name:{
//         type:String,
//         required:true,
//     },
//     image:{
//         type:String,
//         required:true,
//     },
//     category:{
//         type:String,
//         required:true,
//     },
//     new_price:{
//         type:Number,
//         required:true,
//     },
//     old_price:{
//         type:Number,
//         required:true,
//     },
//     date:{
//         type:Date,
//         default:Date.now,
//     },
//     available:{
//         type:Boolean,
//         default:true,
//     }
// });

// // Add product
// app.post('/addproduct', async(req, res)=>{
//     let products = await Product.find({});
//     let id;
//     if(products.length>0)
//     {
//         let last_product_array = products.slice(-1);
//         let last_product = last_product_array[0];
//         id = last_product.id+1;
//     }
//     else{
//         id=1;
//     }

//     const product = new Product({   // 'Product' is the schema created above
//         id:id,
//         name:req.body.name,
//         image:req.body.image,
//         category:req.body.category,
//         new_price:req.body.new_price,
//         old_price:req.body.old_price,
//     })
//     console.log(product);
//     await product.save();
//     console.log("Saved");
//     res.json({
//         success:true,
//         name:req.body.name,
//     });
// });

// // Creating API For Deleting Products
// app.post('/removeproduct', async(req, res)=>{
//     await Product.findOneAndDelete({id:req.body.id});
//     console.log("Removed");
//     res.json({
//         success:true,
//         name:req.body.name
//     });
// });

// // Creating an API for getting all products
// app.get('/allproducts', async(req, res)=>{
//     let products = await Product.find({});
//     console.log("All Products Fetched");
//     res.send(products);
// });

// // Creating Schema for User model
// const Users = mongoose.model('Users',{
//     name:{
//         type:String,
//     },
//     email:{
//         type:String,
//         unique:true,
//     },
//     password:{
//         type:String,
//     },
//     cartData:{
//         type:Object,
//     },
//     date:{
//         type:Date,
//         default:Date.now,
//     }
// });

// // Creating Endpoint for registering the User
// app.post('/signup', async(req, res)=>{
//     let check = await Users.findOne({email:req.body.email});
//     if(check){
//         return res.status(400).json({success:false,errors:"Existing user found with same email address"})
//     }
//     let cart = {};
//     for(let i = 0; i < 300; i++){
//         cart[i] = 0;
//     }
//     const user = new Users({
//         name:req.body.username,
//         email:req.body.email,
//         password:req.body.password,
//         cartData:cart,
//     })

//     await user.save();

//     const data = {
//         user:{
//             id:user.id,
//         }
//     }

//     // const token = jwt.sign(data,'secret_ecom');
//     const token = jwt.sign(data, process.env.JWT_SECRET);
//     res.json({success:true,token});
// });

// // Creating Endpoint for User login
// app.post('/login', async(req, res)=>{
//     let user = await Users.findOne({email:req.body.email});
//     if(user){
//         const passCompare = req.body.password === user.password;
//         if(passCompare){
//             const data = {
//                 user:{
//                     id:user.id
//                 }
//             }
//             // const token = jwt.sign(data,'secret_ecom');
//             const token = jwt.sign(data, process.env.JWT_SECRET);
//             res.json({success:true,token});
//         }
//         else{
//             res.json({success:false,errors:"Wrong Password"});
//         }
//     }
//     else{
//         res.json({success:false,errors:"Wrong Email Id"});
//     }
// });

// // Creating Endpoint for newcollection data
// app.get('/newcollections', async (req,res)=>{
//     let products = await Product.find({});
//     let newcollection = products.slice(1).slice(-8);
//     console.log("NewCollection Fetched");
//     res.send(newcollection);
// });

// // Creating Endpoint for Popular in Women section
// app.get('/popularinwomen', async(req, res)=>{
//     let products = await Product.find({category:"women"});
//     let popular_in_women = products.slice(0,4);
//     console.log("Popular in women fetched");
//     res.send(popular_in_women);
// });

// // Creating Middleware to fetch user
// const fetchUser = async (req, res, next)=>{
//     const token = req.header('auth-token');
//     if(!token){
//         res.status(401).send({errors:"Please authenticate using valid token"});
//     }
//     else{
//         try{
//             // const data = jwt.verify(token, 'secret_ecom');
//             const data = jwt.verify(token, process.env.JWT_SECRET);
//             req.user = data.user;
//             next();
//         } catch(error){
//             res.status(401).send({errors:"Please authenticate using valid token"});
//         }
//     }
// }

// // Creating Endpoint for adding products in cartdata
// app.post('/addtocart', fetchUser, async(req, res)=>{
//     // console.log(req.body,req.user);
//     console.log("Added", req.body.itemId);
//     let userData = await Users.findOne({_id:req.user.id});
//     userData.cartData[req.body.itemId] += 1;
//     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
//     res.send("Added");
// });

// // Creating Endpoint to remove product from cartdata
// app.post('/removefromcart', fetchUser, async(req, res)=>{
//     console.log("Removed", req.body.itemId);
//     let userData = await Users.findOne({_id:req.user.id});
//     if(userData.cartData[req.body.itemId] > 0)
//     userData.cartData[req.body.itemId] -= 1;
//     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
//     res.send("Added");
// });

// // Creating Endpoint to get cartdata
// app.post('/getcart',fetchUser,async (req,res)=>{
//     console.log("GetCart");
//     let userData = await Users.findOne({_id:req.user.id});
//     res.json(userData.cartData);
// });



// app.listen(port, (error) => {
//     if(!error){
//         console.log("Server Running on Port " + port);
//     } else{
//         console.log("Error: " + error);
//     }
// });






require("dotenv").config();

const port = process.env.PORT || 4000;
const express = require("express");
const app = express();

app.set('trust proxy', true);

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const crypto = require("crypto");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./config/cloudinary");

const path = require("path");
const cors = require("cors");
const fs = require("fs");

// ── Razorpay ──────────────────────────────────────────────────
const Razorpay = require("razorpay");
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

if (!fs.existsSync("./upload/images")) {
  fs.mkdirSync("./upload/images", { recursive: true });
}

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "auth-token"]
}));

// ── Database ──────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
  // family: 4
});

app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// ── Cloudinary Storage ────────────────────────────────────────
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "png", "jpeg"]
  }
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: req.file.path
  });
});

// ── Schemas ───────────────────────────────────────────────────

const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

const Users = mongoose.model('Users', {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", {
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  payment: { type: String, default: "pending" }, // pending | paid
  paymentMethod: { type: String },                      // razorpay | cod
  razorpayOrderId: { type: String },
  date: { type: Date, default: Date.now },
  status: { type: String, default: "Order Placed" },
});

// ── Middleware ────────────────────────────────────────────────

const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ errors: "Please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  }
};

// ── Product Routes ────────────────────────────────────────────

app.post('/addproduct', async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product = products.slice(-1)[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  await product.save();
  res.json({ success: true, name: req.body.name });
});

app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, name: req.body.name });
});

app.get('/allproducts', async (req, res) => {
  let products = await Product.find({});
  res.send(products);
});

app.get('/newcollections', async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  res.send(newcollection);
});

app.get('/popularinwomen', async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  res.send(popular_in_women);
});

// ── Auth Routes ───────────────────────────────────────────────

app.post('/signup', async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: false, errors: "Existing user found with same email address" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();

  const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
  res.json({ success: true, token });
});

app.post('/login', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email Id" });
  }
});

// ── Cart Routes ───────────────────────────────────────────────

app.post('/addtocart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added");
});

app.post('/removefromcart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Removed");
});

app.post('/getcart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

// ── Payment Routes ────────────────────────────────────────────

// 1. Create Razorpay Order
app.post("/createrazorpayorder", fetchUser, async (req, res) => {
  try {
    const { amount, address, items } = req.body;
    const options = {
      amount: Math.round(amount * 100), // paise mein
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const razorpayOrder = await razorpay.orders.create(options);

    const order = new Order({
      userId: req.user.id,
      items,
      amount,
      address,
      paymentMethod: "razorpay",
      razorpayOrderId: razorpayOrder.id,
      payment: "pending",
    });
    await order.save();

    res.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderId: order._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
});

// 2. Verify Razorpay Payment
app.post("/verifyrazorpay", fetchUser, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expected === razorpay_signature) {
    await Order.findByIdAndUpdate(orderId, { payment: "paid", status: "Order Placed" });
    // Clear cart
    let cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: cart });
    res.json({ success: true, message: "Payment verified" });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
});

// 3. Place COD Order
app.post("/placeorder", fetchUser, async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    // VALIDATIONS
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order amount"
      });
    }

    if (!address || Object.keys(address).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Address is required"
      });
    }

    const order = new Order({
      userId: req.user.id,
      items,
      amount,
      address,
      paymentMethod: "cod",
      payment: "pending",
      status: "Order Placed",
    });
    
    await order.save();

    // Clear cart
    let cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: cart });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Order placement failed" });
  }
});

// 4. Get My Orders (User)
app.post("/myorders", fetchUser, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).sort({ date: -1 });
  res.json({ success: true, orders });
});

// 5. Get All Orders (Admin)
app.get("/allorders", async (req, res) => {
  const orders = await Order.find({}).sort({ date: -1 });
  res.json({ success: true, orders });
});

// 6. Update Order Status (Admin)
app.post("/updatestatus", async (req, res) => {
  await Order.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
  res.json({ success: true, message: "Status updated" });
});

// ── Start Server ──────────────────────────────────────────────

app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error: " + error);
  }
});
