import mongoose, { Schema, Document, model } from 'mongoose';

interface IBlockData {
  text?: string;
  level?: number;
  file?: {
    url: string;
  };
  caption?: string;
  withBorder?: boolean;
  stretched?: boolean;
  withBackground?: boolean;
}

interface IBlock {
  type: string;
  data: IBlockData;
}

interface IContent {
  time: number;
  blocks: IBlock[];
  version: string;
}

export interface IBlog extends Document {
  title: string;
  summary: string;
  image: string;
  content: IContent;
  mentor: mongoose.Types.ObjectId;
}

const blogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  content: {
    time: {
      type: Number,
      required: true
    },
    blocks: [{
      type: {
        type: String,
        required: true
      },
      data: {
        text: String,
        level: Number,
        file: {
          url: String
        },
        caption: String,
        withBorder: Boolean,
        stretched: Boolean,
        withBackground: Boolean
      }
    }],
    version: {
      type: String,
      required: true
    }
  },
  mentor: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  
}, { timestamps: true } );

export const Blog = model<IBlog>('Blog', blogSchema);
