import Comment from '../models/comment';


export default {
    // async findOne(req, res, next) {
    //     console.log(req.params.place);
    //     const comment = await Comment.findOne({
    //         'place': req.params.place
    //     })
    //     if (!comment) return next();

    //     return res.status(200).send({
    //         data: comment
    //     });
    // },

    async findPlaceComments(req, res, next) {
        //console.log(req.params.place);
        const comment = await Comment.find({
            place: req.params.place
        }).sort({
            createdAt: 'desc'
        });
        if (!comment) return next();

        return res.status(200).send({
            data: comment
        });
    },
    async findAll(req, res) {
        const comments = await Comment.find().sort({
            createdAt: 'desc' // sortowanie malujaco wzgledem daty utowrzenia
        });
        return res.status(200).send({
            data: comments
        });
    },

    async create(req, res) {
        // console.log(req.body);
        const comment = await new Comment({
            place: req.body.place,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            text: req.body.text
        }).save();
        console.log(comment);
        return res.status(201).send({ //status 201-utworzneie nowego zasobu
            data: comment,
            message: 'Comment was added'
        });
    },
    async update(req, res, next) {
        const comment = await Comment.findOne({
            'slug': req.params.slug
        }) //find user in database
        if (!comment) return next();

        comment.title = req.body.title; //update
        await comment.save();

        return res.status(200).send({
            data: comment,
            message: 'Succesfully updated.'
        });
    },

    async delete(req, res, next) {
        const comment = await Comment.findOne({
            'slug': req.params.slug
        })
        if (!comment) return next();
        await comment.remove();

        return res.status(200).send({
            message: 'Succesfuly deleted'
        });
    }
}