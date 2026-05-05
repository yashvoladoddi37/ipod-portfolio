import { APP_URL } from "utils/constants/api";

export type DeviceTheme = {
  body: {
    background: string;
    sticker1?: {
      background: string;
      styles?: Record<string, string | number>;
    };
    sticker2?: {
      background: string;
      styles?: Record<string, string | number>;
    };
    sticker3?: {
      background: string;
      styles?: Record<string, string | number>;
    };
  };
  clickwheel: {
    background: string;
    outline: string;
    button: string;
    centerButton: {
      background: string;
      boxShadow: string;
      outline: string;
    };
  };
};

const Silver: DeviceTheme = {
  body: {
    background: "linear-gradient(180deg, #e3e3e3 0%, #d6d6d6 100%)",
  },
  clickwheel: {
    background: "#FFFFFF",
    outline: "#b9b9b9",
    button: "#AFAFAF",
    centerButton: {
      background: "#ffffff",
      boxShadow: "rgb(191, 191, 191)",
      outline: "#b9b9b9",
    },
  },
};

const Black: DeviceTheme = {
  body: {
    background: "linear-gradient(180deg, #333 0%, #000 100%)",
    sticker3: {
      background: "transparent",
      styles: {
        bottom: "42%",
        right: "15px",
        fontSize: "10px",
        fontWeight: "bold",
        color: "rgba(255, 255, 255, 0.1)",
        textTransform: "uppercase",
        letterSpacing: "2px",
        pointerEvents: "none",
        content: "'YASH'",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
    }
  },
  clickwheel: {
    background: "#1a1a1a",
    outline: "#000",
    button: "#FFFFFF",
    centerButton: {
      background: "#333",
      boxShadow: "rgb(20, 20, 20)",
      outline: "#000",
    },
  },
};

export { Silver, Black };

