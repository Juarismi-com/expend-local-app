import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
   appId: "com.jaupy.app",
   appName: "jaupy",
   webDir: "www",
   server: {
      cleartext: true,
   },
};

export default config;
