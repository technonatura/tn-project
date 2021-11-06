import {
  Schema,
  Model,
  Document,
  model,
  Types,
  Query,
  Error,
  models,
} from "mongoose";
import * as Validator from "validator";

import { UserInterface, SocialMedia } from "./index";

// import { encryptEmail as EncryptEmail } from '../../controllers/auth/hashEmail';

const {
  default: { isEmail, isURL },
} = Validator;

export type { UserInterface, SocialMedia };

export interface UserBaseDocument extends UserInterface, Document {
  roles: Types.Array<string>;
  badges: Types.Array<string>;
  hobbies: Types.Array<string>;

  socialMedias: Types.Array<SocialMedia>;
  follows: Types.Array<string>;
  followers: Types.Array<string>;
}

// Export this for strong typing
export interface UserDocument extends UserBaseDocument {}

// For model
export interface UserModel extends Model<UserBaseDocument> {}

const userSchema = new Schema<UserDocument, UserModel>({
  fullName: {
    type: String,
    required: [true, "Please enter your name"],
    minlength: [4, "Minimum name length is 4 characters"],
  },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "username cannot be blank"],
    validate: [validateUsername, "Only Letters and Numbers are allowed"],
  },

  email: {
    type: String,
    required: [true, "Please enter an email"],
    lowercase: true,
    unique: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },

  isAccountVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },

  status: new Schema({
    emoji: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
  }),

  bio: {
    type: String,
    default: "",
  },

  avatar: {
    type: String,
    default: "",
  },
  banner: {
    type: String,
    default: "",
  },

  points: {
    type: Number,
    require: true,
    default: 0,
  },

  accountCreated: {
    type: Number,
    default: Date.now,
  },

  follows: [String],
  followers: [String],

  birthDate: {
    type: Number,
    required: [true, "Please enter your birthDate"],
  },

  roles: [String], // the role name, the role name must be unique

  socialMedias: [
    {
      name: {
        type: String,
        enum: [
          "github",
          "gitlab",
          "instagram",
          "facebook",
          "website",
          "youtube",
          "discord",
          "twitch",
          "twitter",
        ],
        required: [true, "Please enter social media"],
      },
      url: {
        type: String,
        required: [true, "Please enter social media"],
        validate: [isURL, "Please enter a valid url"],
      },
    },
  ],

  // @ts-ignore
  roleInTechnoNatura: {
    type: Object,
    enum: [
      {
        teacher: Boolean,
        grade: Number,
        isVerified: Boolean,
        branch: {
          type: String,
          required: [true, "technonatura branch cannot be blank"],
        },
      },
      {
        staff: Boolean,
        role: String,
        isVerified: Boolean,
        branch: {
          type: String,
          required: [true, "technonatura branch cannot be blank"],
        },
      },
      {
        student: Boolean,
        grade: Number,
        startPeriod: Number,
        branch: {
          type: String,
          required: [true, "technonatura branch cannot be blank"],
        },
      },
      {
        alumni: Boolean,
        grades: [
          {
            grade: {
              type: String,
              enum: ["mi", "mts", "ma"],
            },
            startPeriod: Number,
            branch: {
              type: String,
              required: [true, "technonatura branch cannot be blank"],
            },
          },
        ],
      },
    ],
  },
  alumni: [{ grade: String, startPeriod: Number, finishPeriod: Number }],

  badges: [String],

  hobbies: [String],
  dream: String,

  gender: {
    type: String,
    enum: ["male", "female"],
  },
});

function validateUsername(str: string) {
  if (!str.match(/^[A-Za-z0-9_-]*$/)) {
    return false;
  }

  return true;
}

export default models.User ||
  model<UserDocument, UserModel>("User", userSchema);
