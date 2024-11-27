import { model, Schema } from 'mongoose';

export const TrackSchema = new Schema(
    {
        title: { type: String, required: true },
        artistName: { type: String, required: true },
        preview: { type: String, required: true }, // audio
        image: { type: String, required: true },
        user: {type: Schema.Types.ObjectId, required: true, ref: 'user'}
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

export const TrackModel = model('track', TrackSchema);