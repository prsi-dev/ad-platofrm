import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Log the incoming request body for debugging
    console.log('Request Body:', req.body);

    try {
      // Handle your POST request logic here
      // For example, interacting with a database or calling another service

      // Assume we have a response to send back
      const response = { success: true, data: 'Your data here' };

      // Log the response that will be sent back
      console.log('Response:', response);

      // Send the response
      res.status(200).json(response);
    } catch (error) {
      // Log any errors that occur during processing
      console.error('Error handling POST request:', error);

      // Send an error response
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Respond with 405 if the method is not POST
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
