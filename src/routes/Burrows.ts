import { Router } from 'express';
import BurrowController from 'src/controllers/BurrowController';

const router = Router();

router.get('/all', BurrowController.all);
router.get('/:burrow_id/show', BurrowController.show);
router.post('/store', BurrowController.store);
router.delete('/:burrow_id/delete', BurrowController.delete);

export default router;