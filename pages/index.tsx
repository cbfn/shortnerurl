import Head from 'next/head';
import { FormEvent, useState } from 'react';

export default function Home() {
  const location = typeof window !== 'undefined' ? window.location : '',
    [url, setURL] = useState(''),
    [shortUrl, setShortUrl] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const response = await fetch('/api/shorterner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url }),
    });

    if (response.ok) {
      const { encodedUrl } = await response.json();
      setShortUrl(encodedUrl);
    }
  }

  return (
    <div className="container mx-auto px-4 justify-center items-center flex flex-col h-screen">
      <Head>
        <title>URL Shortener</title>
        <meta name="description" content="URL Shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="py-4 text-2xl uppercase">URL Shorterner</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-row justify-between"
      >
        <div className="w-full mr-2">
          <input
            id="url"
            type="url"
            name="url"
            placeholder="What's the URL?"
            onChange={(event) => setURL(event.target.value)}
            className="border rounded-md border-gray-300 px-6 py-2 rounded-full w-full h-11"
          />
          {shortUrl && (
            <p className="text-gray-500 mt-2">{`${location}${shortUrl}`}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-300 text-white px-6 py-2 rounded-full font-bold uppercase h-11"
        >
          Shorten
        </button>
      </form>
    </div>
  );
}
