import { model, Schema } from 'mongoose';

export const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        phone: { type: String },
        gender: { type: String },
        email: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

export const UserModel = model('user', UserSchema);