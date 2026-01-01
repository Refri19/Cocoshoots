import mongoose, {Schema, Document} from 'mongoose';
export interface ILogin extends Document {
    username: string;
    password: string;
    createdAt: Date;
}
const LoginSchema: Schema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});
// Prevent model overwrite error in Next.js hot reloading
export default mongoose.models.Login || mongoose.model<ILogin>('Login', LoginSchema);