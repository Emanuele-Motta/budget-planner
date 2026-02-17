import { Response } from 'express';
import { dashboardService } from '../services/dashboard.service.js';
import { AuthedRequest } from '../middleware/auth.middleware.js';

export const dashboardController = {
  async kpi(req: AuthedRequest, res: Response) {
    const data = await dashboardService.getKpi(req.user!.userId);
    res.json(data);
  }
};
