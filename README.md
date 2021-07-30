# ShortenerUrl

This is a Shortener Url project created with [Next.js](https://nextjs.org), [Tailwindcss](https://tailwindcss.com) and [Firestore Database](https://firebase.google.com/docs/firestore)

## Getting Started

First, `npm install` and run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Fill the input field with a valid URL and see the shortener url result bellow the input.
Copy the shortner url and pass into the browser. Ex: `http://localhost:3000/00ghjkkk`.

What is expected?

Redirect the user for the page related with the hash.

I used an database to store the original url and the shortener url as well. It was necessary to check if the url exists or not. If url exists it will return the shortener url stored before. Not nececssary to store again. 

APIS:

- http://localhost:3000/api/shorterner

  Post method that's accept an url into the body. Ex:

  ```javascript
  {
    url: 'https://www.apple.com/iphone-se/';
  }
  ```
- http://localhost:3000/api/geturl?hash=hash

  Get method that's accept an hash as query param.

Check out the demo page in [https://shorturl.cbfn.dev](https://shorturl.cbfn.dev) for more details.




