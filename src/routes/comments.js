import {
    Router
} from 'express';
import commentController from '../controller/commentController';
import {
    catchAsync
} from '../middlewares/errors';
import jwtAuth from '../middlewares/auth'

export default () => {
    const api = Router();

    //GET /comments/:id   - pobieranie pojedynczego utworu
    api.get('/:place', catchAsync(commentController.findPlaceComments));

    // GET /comments
    api.get('/', catchAsync(commentController.findAll));

    // POST /comments -creating new comment
    api.post('/', jwtAuth, catchAsync(commentController.create));

    // PUT /comments/:id
    api.put('/:place', catchAsync(commentController.update));

    // DELETE/:id
    api.delete('/:place', catchAsync(commentController.delete));

    api.get('/protecteddata', jwtAuth, function (req, res) {
        res.send('Be or not to be?');
    });


    // api.get('/protecteddata', jwtAuth, function (req, res) {
    //     res.send('Be or not to be?');
    // });

    // MVC- Model View Controller -wzorzec,sposób strukturyzacji aplikacji
    //- powiązanie akcji z poszczególnymi ścieżkami

    return api;
}