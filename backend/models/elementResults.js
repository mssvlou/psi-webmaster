const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ElementResultsSchema = new Schema({
    elements: {
        type: [String]
    },

    verdict: {
        type: String,
        enum: ["passed", "warning", "failed", "inapplicable"]
    },

    assertion: {
        type: Schema.ObjectId,
        ref: "QWAssertion",
        required: true
    }
});

module.exports = mongoose.model("ElementResults", ElementResultsSchema)