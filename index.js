import { createBareServer } from "@tomphttp/bare-server-node";
import { createServer } from "node:http";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import useragent from "express-useragent";
import cookieParser from "cookie-parser";

dotenv.config();

const bare = createBareServer("/bare/");
const __dirname = process.cwd();
const httpServer = createServer();
const app = express(httpServer);


app.use(useragent.express());
app.use(cookieParser());


app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.set("view engine", "ejs");
app.use("/uv/", express.static(path.join(__dirname, "/assets/uv")));
app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "/views"));


app.get('/', async (req, res) => {
    const userAgent = req.useragent;

    if (userAgent.isMobile) {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/mobile/index.ejs'));
    } else {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/index.ejs'));
    }
});

app.get('/a', async (req, res) => {
    const userAgent = req.useragent;

    if (userAgent.isMobile) {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/mobile/index.ejs'));
    } else {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/apps.ejs'));
    }
});

app.get('/g', async (req, res) => {
    const userAgent = req.useragent;

    if (userAgent.isMobile) {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/mobile/index.ejs'));
    } else {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/games.ejs'));
    }
});

app.get('/u', async (req, res) => {
    const userAgent = req.useragent;

    if (userAgent.isMobile) {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/mobile/index.ejs'));
    } else {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/util.ejs'));
    }
});

app.get('/s', async (req, res) => {
    const userAgent = req.useragent;

    if (userAgent.isMobile) {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/mobile/index.ejs'));
    } else {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/settings.ejs'));
    }
});

app.get('/credits', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.sendFile(path.join(process.cwd(), './views/credits.ejs'));
});

app.get('/tos', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.sendFile(path.join(process.cwd(), './views/tos.ejs'));
});


app.use((_, res) => res.status(404).render("404"));

httpServer.on("request", (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
    } else {
        app(req, res);
    }
});

httpServer.on("error", (err) => console.log(err));
httpServer.on("upgrade", (req, socket, head) => {
    if (bare.shouldRoute(req)) bare.routeUpgrade(req, socket, head);
    else socket.end();
});

httpServer.listen({ port: process.env.PORT || 3000 }, () => {
    const addr = httpServer.address();
    console.log(`
    ███████╗░██████╗░██╗░░░██╗██╗███╗░░██╗░█████╗░██╗░░██╗
    ██╔════╝██╔═══██╗██║░░░██║██║████╗░██║██╔══██╗╚██╗██╔╝
    █████╗░░██║██╗██║██║░░░██║██║██╔██╗██║██║░░██║░╚███╔╝░
    ██╔══╝░░╚██████╔╝██║░░░██║██║██║╚████║██║░░██║░██╔██╗░
    ███████╗░╚═██╔═╝░╚██████╔╝██║██║░╚███║╚█████╔╝██╔╝╚██╗
    ╚══════╝░░░╚═╝░░░░╚═════╝░╚═╝╚═╝░░╚══╝░╚════╝░╚═╝░░╚═╝\n
                        Version ${process.env.VERSION}
                        Port: ${addr.port}`);
});