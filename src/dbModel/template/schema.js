const mongoose = require("mongoose");

const Template = mongoose.model(
    "tbl_template",
    new mongoose.Schema(
        {
            template_name: {
                type: String
            },
            subject: {
                type: String
            },
            html_content: {
                type: String
            },

        },
        { versionKey: false }
    )
);

exports.Template = Template;
