import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  photo: Buffer | string;
  status: string;
  password: string;
  createdAt: Date;
  passwordConfirm?: string;
  checkPassword: (password: string, storedPassword: string) => boolean;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true, minlength: 8 },
  passwordConfirm: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (this: IUser, value: string): boolean {
        const passwordValue = this.password;
        return value === passwordValue;
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: Buffer,
    required: true,
  },
  status: { type: String },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.checkPassword = async (
  candidatePassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
