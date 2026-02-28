import fastify from "fastify";
import cors from "@fastify/cors";

import { teamsRoutes } from "./routes/teams";
import { driversRoutes } from "./routes/drivers";
import { circuitsRoutes } from "./routes/circuits";

const server = fastify({ logger: true });

// Registro do CORS
server.register(cors);

// Registro das rotas
server.register(teamsRoutes);
server.register(driversRoutes);
server.register(circuitsRoutes);

// Rota raiz
server.get("/", async () => {
  return {
    name: "F1 API",
    version: "1.0.0",
    description: "API de dados da Fórmula 1",
    endpoints: [
      "GET /teams - Lista todas as equipes",
      "GET /teams/:id - Detalhes de uma equipe",
      "GET /teams/:id/drivers - Pilotos de uma equipe",
      "GET /drivers - Lista todos os pilotos",
      "GET /drivers/:id - Detalhes de um piloto",
      "GET /drivers/champions - Lista campeões mundiais",
      "GET /drivers/standings - Ranking de pilotos",
      "GET /circuits - Lista todos os circuitos",
      "GET /circuits/:id - Detalhes de um circuito",
      "GET /circuits/longest - Circuitos por tamanho",
    ],
  };
});

// Health check
server.get("/health", async () => {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
  };
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await server.listen({ port, host: "0.0.0.0" });
    console.log(`🏎️  F1 API rodando em http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
