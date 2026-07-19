import { Schema, model, models } from "mongoose";

const ganeshaSchema = new Schema(
    {
        order: { type: Number, required: true, unique: true },
        nameTH: { type: String, required: true },
        nameEN: { type: String, required: true },
        prays: { type: Number, default: 0 },
        meaning: { type: String },
        color: { type: String },
        vehicle: { type: String },
        weapons: { type: String },
        imageUrl: { type: String, default: "" },
        mantra: { type: String },

        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
);

const Ganesha = models.Ganesha || model("Ganesha", ganeshaSchema);

export default Ganesha;
