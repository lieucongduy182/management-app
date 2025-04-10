import { Request, Response } from 'express';
import { SuccessResponse } from '../cores/success';
import searchService from '../services/search';

class SearchController {
  static async search(req: Request, res: Response) {
    const query = req.query.query as string;
    const search = await searchService.search({
      query,
    });
    return new SuccessResponse({
      message: ' Search successfully',
      data: search,
    }).send(res);
  }
}

export default SearchController;
