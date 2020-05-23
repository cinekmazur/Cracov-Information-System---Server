import mongoose from 'mongoose';

const Pubs = mongoose.Schema({
    pubName: String,
    address: String,
    image: String
});

export default mongoose.model('Pubs', Pubs);