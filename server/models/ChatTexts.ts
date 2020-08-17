import mongoose, { Document, Schema } from 'mongoose';

interface ChatTextsInterface extends Document {
    text: string;
    user: string;
}

const ChatTextsSchema: Schema = new Schema({
    text: String,
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
});

const ChatTexts = mongoose.model<ChatTextsInterface>(
    'ChatTexts',
    ChatTextsSchema,
);

export default ChatTexts;
