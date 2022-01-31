import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { query } = useRouter();

  useEffect(() => {
    (async () => {
      if (query.shop) {
        const response = await fetch(`/api?shop=${query.shop}`);
        const redirectUri = await response.text();
        console.log(redirectUri);
        window.location.href = redirectUri;
      }
    })();
  }, [query.shop]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Your shop is{" "}
          <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
            {query.shop ?? "no shop"}
          </code>
        </p>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="ml-2 h-4" />
        </a>
      </footer>
    </div>
  );
}
