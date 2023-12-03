var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 48,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 98,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});
import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";

// app/components/Sidebar.tsx
import { Button } from "@nextui-org/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
function Sidebar() {
  return /* @__PURE__ */ jsxDEV2("div", { className: "h-full max-w-[260px] border-small px-1 py-6 border-default-200 dark:border-default-100", children: /* @__PURE__ */ jsxDEV2("div", { className: "h-full flex flex-col justify-between", children: [
    {
      text: "new chat",
      icon: /* @__PURE__ */ jsxDEV2("i", { className: "ri-ai-generate ri-xl" }, void 0, !1, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 7,
        columnNumber: 10
      }, this)
    },
    {
      text: "threads",
      icon: /* @__PURE__ */ jsxDEV2("i", { className: "ri-arrow-up-line ri-xl" }, void 0, !1, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 11,
        columnNumber: 10
      }, this)
    },
    {
      text: "settings",
      icon: /* @__PURE__ */ jsxDEV2("i", { className: "ri-arrow-up-circle-fill ri-xl" }, void 0, !1, {
        fileName: "app/components/Sidebar.tsx",
        lineNumber: 15,
        columnNumber: 10
      }, this)
    }
  ].map((section, i) => /* @__PURE__ */ jsxDEV2("div", { className: "w-full mx-auto flex flex-row justify-center leading-4", children: /* @__PURE__ */ jsxDEV2(Button, { className: "w-full", color: "primary", variant: "light", children: [
    section.icon,
    "\xA0",
    /* @__PURE__ */ jsxDEV2("p", { children: section.text }, void 0, !1, {
      fileName: "app/components/Sidebar.tsx",
      lineNumber: 25,
      columnNumber: 29
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Sidebar.tsx",
    lineNumber: 24,
    columnNumber: 8
  }, this) }, i, !1, {
    fileName: "app/components/Sidebar.tsx",
    lineNumber: 23,
    columnNumber: 7
  }, this)) }, void 0, !1, {
    fileName: "app/components/Sidebar.tsx",
    lineNumber: 20,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/components/Sidebar.tsx",
    lineNumber: 19,
    columnNumber: 3
  }, this);
}

// app/root.tsx
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-WFRCDCL4.css";

// app/styles/main.css
var main_default = "/build/_assets/main-HT6BO6NO.css";

// node_modules/remixicon/fonts/remixicon.css
var remixicon_default = "/build/_assets/remixicon-EDKQ2KWS.css";

// app/root.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var styles = [
  { rel: "stylesheet", href: tailwind_default },
  { rel: "stylesheet", href: main_default },
  { rel: "stylesheet", href: remixicon_default }
], links = () => [
  ...void 0 ? [{ rel: "stylesheet", href: void 0 }, ...styles] : [...styles]
];
function App() {
  let [theme, setTheme] = useState("dark");
  return /* @__PURE__ */ jsxDEV3("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV3("head", { children: [
      /* @__PURE__ */ jsxDEV3("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 38,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV3("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 39,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV3(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 40,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV3(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 41,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 37,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV3("body", { children: [
      /* @__PURE__ */ jsxDEV3(NextUIProvider, { children: /* @__PURE__ */ jsxDEV3("main", { className: `${theme} text-foreground bg-background`, children: [
        /* @__PURE__ */ jsxDEV3(Sidebar, {}, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 46,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV3(Outlet, {}, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 47,
          columnNumber: 7
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 45,
        columnNumber: 6
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 44,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV3(ScrollRestoration, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 50,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV3(Scripts, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 51,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV3(LiveReload, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 52,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 43,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, this);
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  meta: () => meta
});
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var meta = () => [
  { title: "New Remix App" },
  { name: "description", content: "Welcome to Remix!" }
];
function Index() {
  return /* @__PURE__ */ jsxDEV4("div", { children: /* @__PURE__ */ jsxDEV4("p", { children: "index" }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 13,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 12,
    columnNumber: 3
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-VXVXJ3PZ.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-XOHTLGBQ.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-SXC7MB5E.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-7YUFBJD6.js", imports: ["/build/_shared/chunk-NMZL6IDN.js"], hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-7VJSQ2HO.js", imports: void 0, hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 } }, version: "78370453", hmr: { runtime: "/build/_shared/chunk-SXC7MB5E.js", timestamp: 1701580425674 }, url: "/build/manifest-78370453.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
