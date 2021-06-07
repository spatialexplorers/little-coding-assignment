import { Global, css } from "@emotion/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Global
        styles={css`
          html,
          body {
            padding: 0;
            margin: 0;
            background: white;
            min-height: 100%;
            font-family: Helvetica, Arial, sans-serif;
            font-size: 16px;
          }
        `}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
