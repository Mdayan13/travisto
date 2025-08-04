import * as Sentry from "@sentry/react-router";

Sentry.init({
  dsn: "https://d4b061db4a411118f7f32e1c0cf3fd37@o4509779541360640.ingest.us.sentry.io/4509779543064576",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});
