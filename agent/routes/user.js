import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    return res.status(200).json({ errors: { email: "can't be blank" } });
});

router.get('/:userId', (req, res) => {
    return res.status(200).json({ errors: { email: req.params.userId } });
});

export default router;