const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    name: {
      type: String,
      required: [true, "Add Contact Name"],
    },
    email: {
      type: String,
      require: [true, "Add Contact Email"],
    },
    phone: {
      type: String,
      require: [true, "Add Contact Phone_no"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
