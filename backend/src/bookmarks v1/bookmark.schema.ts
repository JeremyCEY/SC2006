/*/import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document } from "mongoose";
import { User } from "src/auth/user.schema";
import { Resale } from "src/resale/resale.model";

export type BookmarkDocument = Bookmark & Document

@Schema({
    timestamps: true,
})
export class Bookmark extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Resale'})
    propertyId: Resale;


}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);/*/
