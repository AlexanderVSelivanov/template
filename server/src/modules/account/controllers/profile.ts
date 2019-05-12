import {RequestHandler} from 'express';

const profileController: RequestHandler = async (request, response) => {
  response.json(request.account!.user);
};

export default profileController;
