import mongoose from 'mongoose';

// Get your connection string from .env.local
const MONGODB_CONN_STR = process.env.MONGODB_CONNECTION_STRING

export const connectDatabase = async ()=>{
  try {

    if (!(global as any).mongoose) {

      (global as any).mongoose = await mongoose.connect(MONGODB_CONN_STR, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });

    }

  }
  catch (ex) {
    console.error(ex);
  }
}

const databaseMiddleware = async (req, res, next) => {

  await connectDatabase();

  // You could extend the NextRequest interface 
  // with the mongoose instance as well if you wish.
  // req.mongoose = global.mongoose;

  return next();

};

export default databaseMiddleware;