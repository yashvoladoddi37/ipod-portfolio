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
    background: "linear-gradient(180deg, #7d7c7d 0%, #1e1e1e 100%)",
  },
  clickwheel: {
    background: "#2a2a2a",
    outline: "#1a1a1a",
    button: "#FFFFFF",
    centerButton: {
      background: "#7d7c7d",
      boxShadow: "rgb(50, 50, 50)",
      outline: "#1a1a1a",
    },
  },
};

const U2: DeviceTheme = {
  body: {
    background: "linear-gradient(180deg, #7d7c7d 0%, #1e1e1e 100%)",
  },
  clickwheel: {
    background: "#de2029",
    outline: "#1a1a1a",
    button: "#ffffff",
    centerButton: {
      background: "#5d5c5d",
      boxShadow: "rgb(50, 50, 50)",
      outline: "#1a1a1a",
    },
  },
};

// This theme was created in collaboration with Parlophone Records
// for the artist Mnelia.
const Mnelia: DeviceTheme = {
  body: {
    background:
      "linear-gradient(193.42deg, #8676d6 49.48%, rgba(238, 65, 122, 0.74) 100%);",
    sticker1: {
      background: `url('${APP_URL}/palm.svg') no-repeat bottom left`,
      styles: {
        bottom: 0,
        left: 0,
        height: "40%",
        width: "50%",
        marginLeft: "-10%",
        marginBottom: "-10%",
        mixBlendMode: "multiply",
      },
    },
    sticker2: {
      background: `url('${APP_URL}/palm.svg') no-repeat`,
      styles: {
        position: "absolute",
        bottom: 0,
        right: 0,
        height: "40%",
        width: "50%",
        marginRight: "-10%",
        marginBottom: "-35%",
        mixBlendMode: "multiply",
      },
    },
    sticker3: {
      background: `url("${APP_URL}/mnelia_signature.png") no-repeat`,
      styles: {
        position: "absolute",
        bottom: "42%",
        width: "60px",
        height: "40px",
        backgroundSize: "contain",
        right: 15,
        opacity: "50%",
      },
    },
  },
  clickwheel: {
    background: "#2a2a2acf",
    outline: "#62315e",
    button: "#ffffff",
    centerButton: {
      background: "#c69edb",
      boxShadow: "rgb(142 54 101)",
      outline: "#62315e",
    },
  },
};

// Birthday theme inspired by Mahitha's birthday website - Based on Black theme
const Birthday: DeviceTheme = {
  body: {
    background: "linear-gradient(180deg, #7d7c7d 0%, #1e1e1e 100%)",
    sticker1: {
      background: "radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.03), transparent 50%)",
      styles: {
        bottom: "10%",
        left: "5%",
        height: "30%",
        width: "40%",
        borderRadius: "50%",
        filter: "blur(20px)",
        animation: "float1 8s ease-in-out infinite",
      },
    },
    sticker2: {
      background: "radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.02), transparent 50%)",
      styles: {
        top: "15%",
        right: "8%",
        height: "25%",
        width: "35%",
        borderRadius: "50%",
        filter: "blur(15px)",
        animation: "float2 10s ease-in-out infinite",
      },
    },

  },
  clickwheel: {
    background: "#2a2a2a",
    outline: "#1a1a1a",
    button: "#FFFFFF",
    centerButton: {
      background: "#7d7c7d",
      boxShadow: "rgb(50, 50, 50)",
      outline: "#1a1a1a",
    },
  },
};

export { Silver, Black, U2, Mnelia, Birthday };
