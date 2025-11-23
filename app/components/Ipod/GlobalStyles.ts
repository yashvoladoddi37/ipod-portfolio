import { createGlobalStyle } from "styled-components";
import { Screen } from "utils/constants";

export const GlobalStyles = createGlobalStyle`
  @import url('/styles/fonts.css');
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@200;300;400;500;600&display=swap');

  body {
    height: 100dvh;
    display: grid;
    place-items: center;
    margin: 0;
    font-family: 'FK Grotesk', 'Ranade', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    color: #e0e0e0;
    background: #0a0a0a;
    min-height: 550px;
    overflow: auto;
    font-weight: 300;
    letter-spacing: 0.02em;
    position: relative;

    /* Add grainy texture overlay */
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 120%;
      height: 120%;
      background-image:
        radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.01) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.005) 0%, transparent 50%);
      background-size: 200px 200px, 300px 300px, 150px 150px;
      animation: grain 20s steps(10) infinite;
      pointer-events: none;
      z-index: -1;
      opacity: 0.3;
    }

    ${Screen.XS.MediaQuery} {
      min-height: 480px;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
    body {
      background: #0a0a0a;
      color: #e0e0e0;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Ranade', 'FK Grotesk', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    font-weight: 400;
    letter-spacing: 0.04em;
  }

  h1 {
    font-weight: 300;
  }

  /* Dark theme animations */
  @keyframes float1 {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    25% { transform: translateY(-10px) translateX(5px); }
    50% { transform: translateY(-5px) translateX(-3px); }
    75% { transform: translateY(-15px) translateX(2px); }
  }

  @keyframes float2 {
    0%, 100% { transform: translateY(0px) translateX(0px); }
    33% { transform: translateY(-8px) translateX(-4px); }
    66% { transform: translateY(-12px) translateX(6px); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.02); }
  }

  /* Grainy texture overlay */
  @keyframes grain {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-5%, -10%); }
    20% { transform: translate(-15%, 5%); }
    30% { transform: translate(7%, -25%); }
    40% { transform: translate(-5%, 25%); }
    50% { transform: translate(-15%, 10%); }
    60% { transform: translate(15%, 0%); }
    70% { transform: translate(0%, 15%); }
    80% { transform: translate(3%, 35%); }
    90% { transform: translate(-10%, 10%); }
  }
`;
