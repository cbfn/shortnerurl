import db from '../../utils/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createHash } from 'crypto';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(400).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { url } = req.body,
    urls = await db.collection('entries').get(),
    urlsData = urls.docs.map((entry) => entry.data()),
    encodedUrl = createHash('shake256', { outputLength: 4 })
      .update(url, 'utf8')
      .digest('hex');

  if (!url) {
    res.status(400).end();
  } else if (urlsData.some((entry) => entry.url === url)) {
    const { id, hash } = urlsData.filter((entry) => entry.url === url)[0];
    res.status(200).json({ id, encodedUrl: hash });
  } else {
    const { id } = await db.collection('entries').add({
      ...req.body,
      hash: encodedUrl,
      created: new Date().toISOString(),
    });
    res.status(200).json({ id, encodedUrl });
  }
}
