import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Params } from 'next/dist/next-server/server/router';
import { useRouter } from 'next/dist/client/router';

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: Params) => {
  return { props: { id: params.id } };
};

function RedirectUrl({ id }: Params) {
  const router = useRouter();
  useEffect(() => {
    async function redirect() {
      const response = await fetch(`/api/geturl?hash=${id}`);
      if (response.ok) {
        const { url } = await response.json();
        if (typeof window !== 'undefined') window.location.assign(url);
      } else {
        router.push('/');
      }
    }
    redirect();
  });

  return <></>;
}

export default RedirectUrl;
