import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import child_process from "child_process";
import { env } from "process";
//uncomment the bellow code to enable https
/*const baseFolder = env.APPDATA !== undefined && env.APPDATA !== "" ? `${env.APPDATA}/ASP.NET/https` : `${env.HOME}/.aspnet/https`;

const certificateName = "axpertstudio.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (0 !== child_process.spawnSync("dotnet", ["dev-certs", "https", "--export-path", certFilePath, "--format", "Pem", "--no-password"], { stdio: "inherit" }).status) {
    throw new Error("Could not create certificate.");
  }
}*/

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` : env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(";")[0] : "https://localhost:7172";

const baseConfig = {
  base: "",
  plugins: [plugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "^/weatherforecast": {
        target,
        secure: false,
      },
      "^/Authentication/login": {
        target,
        secure: false,
      },
      "^/Authentication/logout": {
        target,
        secure: false,
      },
      "^/GetData/sql": {
        target,
        secure: false,
      },
      "^/GetData/redis": {
        target,
        secure: false,
      },
      "^/GetData/menu": {
        target,
        secure: false,
      },
      "^/GetData/dropdown": {
        target,
        secure: false,
      },
      "^/GetData/menu/children": {
        target,
        secure: false,
      },
      "^/GetData/form": {
        target,
        secure: false,
      },
      "^/GetData/actionlist": {
         target,
         secure: false,
      },
      "^/SaveFormData": {
        target,
        secure: false,
      },
      "^/formlock/release": {
        target,
        secure: false,
      },
      "^/formlock/isLocked": {
        target,
        secure: false,
      },
      "^/GetData/ivcolumns": {
        target,
        secure: false,
      },
      "^/DeleteData": {
        target,
        secure: false,
      },
      "^/DeleteData/deletetstruct": {
        target,
        secure: false,
      },
      "^/PublishToRunTime": {
        target,
        secure: false,
      },
      "^/General/callRestWs": {
        target,
        secure: false,
      },
      "^/General/checkduplicatestructname": {
        target,
        secure: false,
      },
      "^/General/checkduplicatetstcompname": {
        target,
        secure: false,
      },

      "^/FetchStructureFromDB": {
        target,
        secure: false,
      },
      "^/RearrangeComps/tstruct": {
        target,
        secure: false,
      },
      "^/RearrangeComps/iview": {
        target,
        secure: false,
      },
      "^/CompareXml": {
        target,
        secure: false,
      },
      "^/CompareivXML": {
        target,
        secure: false,
      },
      "^/General/executesql": {
        target,
        secure: false,
      },
      "^/Undo/getChangedProperties": {
        target,
        secure: false,
    },
    "^/Undo/undoChanges": {
        target,
        secure: false,
          },
    "^/General/deleteactions": {
        target,
        secure: false,
    },
    },
    port: 5173,
    // uncomment the below property to enable https
    // https: {
    //   key: fs.readFileSync(keyFilePath),
    //   cert: fs.readFileSync(certFilePath),
    // },
  },
};

const minifiedConfig = defineConfig({
  ...baseConfig,
});
// https://vitejs.dev/config/
const nonMinifiedConfig = defineConfig({
  ...baseConfig,
  build: {
    minify: false,
    outDir: "D:/AgileLabs/AxpertStudio_NonMinified/wwwroot",
    terserOptions: {
      compress: false,
      mangle: false,
    },
    rollupOptions: {
      preserveEntrySignatures: true,
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        // Add other entry points if needed
      },
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "[name]-[hash][extname]",
      },
    },
  },
});

export default ({ mode }) => {
  if (mode === "nonminified") {
    return nonMinifiedConfig;
  }
  return minifiedConfig;
};
