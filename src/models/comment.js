import mongoose from 'mongoose';
// import URLSlugs from 'mongoose-url-slugs';

const Comment = mongoose.Schema({
    place: {
        type: String,
        unique: true,
        index: true
    },
    first_name: String,
    last_name: String,
    text: String,
}, {
    timestamps: true
});

//def of slug using plugin:
// Comment.plugin(URLSlugs(['place', 'first_name', 'last_name'], {
//     field: 'slug',
//     update: true
// }));

export default mongoose.model('Comment', Comment);