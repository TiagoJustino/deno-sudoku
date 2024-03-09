import { AppProps } from "$fresh/server.ts";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Deno Sudoku</title>
      </head>
      <body class="max-w-fit mx-auto bg-[#86efac] px-4 py-8">
        <Component />
      </body>
    </html>
  );
}
