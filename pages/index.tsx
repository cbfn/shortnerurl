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
    <div className="max-w-3xl mx-auto px-4 justify-center items-center flex flex-col h-screen">
      <Head>
        <title>URL Shortener</title>
        <meta name="description" content="URL Shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="py-4 text-5xl text-gray-600 mb-4 font-medium">Shorturl</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 md:grid-cols-3 gap-y-4 justify-between"
      >
        <div className="w-full mr-2 col-span-2">
          <input
            id="url"
            type="url"
            name="url"
            placeholder="What's the URL?"
            onChange={(event) => setURL(event.target.value)}
            className="border rounded-md border-gray-300 px-6 py-2 rounded-full w-full h-11"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-300 text-white px-6 py-2 rounded-full font-bold uppercase h-11 md:ml-2"
        >
          Shorten
        </button>
      </form>
      {shortUrl && (
        <p className="text-gray-500 mx-auto table mt-4 text-2xl">{`${location}${shortUrl}`}</p>
      )}
      <small className="mt-12">Developed by cbfn.dev</small>
    </div>
  );
}
