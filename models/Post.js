const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    body: String,
    username: String,
    comments: [
        {
            body: String,
            username: String
        }, {
            timestamps: true
        }
    ],
    likes: [
        {
            username: String,
        }, {
            timestamps: true
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true
});

module.exports = model('Post', postSchema);