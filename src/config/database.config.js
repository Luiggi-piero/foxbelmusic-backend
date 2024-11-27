import { connect, set } from 'mongoose';

// obliga a usar la estructura del esquema
set('strictQuery', true);

export const dbconnect = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log('✅ connect successfully');
    } catch (error) {
        console.log(error);
    }
};