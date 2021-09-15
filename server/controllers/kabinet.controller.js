
import dotenv from 'dotenv';
import userService from '../services/kabinet.services';

dotenv.config();


class KabinetController {
    static async registerEvent(req, res) {
        try {
           
            const result = await userService.createEvent(req.body);
            
            return res.status(201).json({
                status: 201,
                data: {
                    ...result
                },
            });
        } catch (error) {
            return res.status(409).json({
                status: 409,
                error: error.message,
            });
        }
    }
    static async registerInterest(req, res) {
        try {
           
            const result = await userService.createInterest(req.body);
            
            return res.status(201).json({
                status: 201,
                data: {
                    ...result
                },
            });
        } catch (error) {
            return res.status(409).json({
                status: 409,
                error: error.message,
            });
        }
    }
    static async getInterest(req, res) {
        try {
           
            const result = await userService.getInterest(req.body);
            
            return res.status(200).json({
                status: 200,
                data: {
                    val: result
                },
            });
        } catch (error) {
            return res.status(409).json({
                status: 409,
                error: error.message,
            });
        }
    }
    static async getEvents(req, res) {
        try {
           
            // const result = await userService.getEvent(req.body);
            
            return res.status(200).json({
                status: 200,
                data: {
                    val: "result"
                },
            });
        } catch (error) {
            return res.status(409).json({
                status: 409,
                error: error.message,
            });
        }
    }

    static async delEvents(req, res) {
        try {
           
            const result = await userService.delEvent(req.body);
            
            return res.status(200).json({
                status: 200,
                data: {
                    ...result
                },
            });
        } catch (error) {
            return res.status(409).json({
                status: 409,
                error: error.message,
            });
        }
    }

   
}

export default KabinetController;
