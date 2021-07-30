import db from '../../utils/db';
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(400).send({ message: 'Only GET requests allowed' });
    return;
  }

  const { hash } = req.query,
    urls = await db.collection('entries').get(),
    urlsData = urls.docs.map((entry) => entry.data());

  const url = urlsData.find((entry) => entry.hash === hash);

  if (url) {
    res.status(200).json({ url });
  } else {
    res.status(400).end();
  }
}
