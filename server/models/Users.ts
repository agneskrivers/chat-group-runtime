import mongoose, { Schema, Document } from 'mongoose';

interface UsersInterface extends Document {
    fullName: string;
    user: string;
    pass: string;
    avatar: string;
    isAdmin: boolean;
}

const UsersSchema: Schema = new Schema({
    fullName: String,
    user: String,
    pass: String,
    avatar: String,
    isAdmin: Boolean,
})

const Users = mongoose.model<UsersInterface>('Users', UsersSchema);

export default Users;