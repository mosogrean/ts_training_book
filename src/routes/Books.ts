import { Router } from 'express';
import BookController from '../controllers/BookController';


const router = Router();

router.get('/all', BookController.all);
router.get('/:book_id/show', BookController.show);
router.post('/store', BookController.store);
router.put('/:book_id/update', BookController.update);
router.delete('/:book_id/delete', BookController.delete);

export default router;