import express from 'express';
import kabinetController from '../controllers/kabinet.controller';


const router = express.Router();

router.get('/events',
    kabinetController.getEvents);

router.get('/interest',
    kabinetController.getEvents);

router.post('/create_events',
// You can do some validations here
    kabinetController.registerEvent);

router.post('/create_interest',
// You can do some validations here
    kabinetController.registerInterest);

router.delete('/del_events',
// You can do some validations here
    kabinetController.delEvents);





export default router;
