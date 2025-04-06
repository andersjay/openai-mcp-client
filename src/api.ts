import { Application, Router } from "oak";
import { mcpClient } from "./client.ts";
import { callTool } from "./mcp.ts";

const router = new Router();

// Endpoint para listar todas as ferramentas disponíveis
router.get("/tools", async (ctx) => {
  const toolsList = await mcpClient.listTools();
  ctx.response.body = toolsList;
});

// Endpoint para executar uma ferramenta específica
router.post("/tools/:toolName", async (ctx) => {
  const toolName = ctx.params.toolName;
  
  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = { error: "Corpo da requisição ausente" };
    return;
  }

  const body = await ctx.request.body().value;
  const [err, result] = await callTool(mcpClient, toolName, JSON.stringify(body));

  if (err) {
    ctx.response.status = 400;
    ctx.response.body = { error: err };
    return;
  }

  ctx.response.body = result;
});

const app = new Application();

// Middleware para CORS
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );
  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );
  
  if (ctx.request.method === "OPTIONS") {
    ctx.response.status = 200;
    return;
  }
  
  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = 8000;
console.log(`Servidor API rodando em http://localhost:${port}`);

await app.listen({ port }); 