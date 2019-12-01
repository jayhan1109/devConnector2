import mongoose from 'mongoose';
import config from 'config';

const db = config.get('mongoURI');

export const connectDB =async()=>{
    try {
        await mongoose.connect(db,{
            useUnifiedTopology:true,
            useCreateIndex:true
        });
        console.log('MongoDB Connected...');
        
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}