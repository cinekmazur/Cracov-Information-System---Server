import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true, //unique type of every email
        lowercase: true,
        trim: true, //witout space on the begin and end 
    }
}, {
    timestamps: true //date of create and update
});
//ex- typpicaly for mongodb
// 54759eb3c090d83494e2d804
// api/users/54759eb3c090d83494e2d804

//slug
//Marcin Mazur > Marcin-Mazur
// api/users/Marcin-Mazur



//plugin responsible for create passport properties:
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});
//export of model:
export default mongoose.model('User', userSchema);