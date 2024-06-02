async function registerSW() {
    const workerURL = "/sw.js";
    const worker = await navigator.serviceWorker.getRegistration(workerURL, { scope: "/edu" });
    return worker || navigator.serviceWorker.register(workerURL, { scope: __uv$config.prefix });
}

registerSW();