import { FastifyInstance } from "fastify";
import { teams } from "../data/teams";
import { drivers } from "../data/drivers";

export async function teamsRoutes(app: FastifyInstance) {
  // GET /teams - Lista todas as equipes
  app.get("/teams", async () => {
    return teams;
  });

  // GET /teams/:id - Retorna uma equipe específica
  app.get<{ Params: { id: string } }>("/teams/:id", async (request, reply) => {
    const team = teams.find((t) => t.id === parseInt(request.params.id));
    if (!team) {
      reply.code(404);
      return { error: "Equipe não encontrada" };
    }
    return team;
  });

  // GET /teams/:id/drivers - Retorna os pilotos de uma equipe
  app.get<{ Params: { id: string } }>("/teams/:id/drivers", async (request, reply) => {
    const teamId = parseInt(request.params.id);
    const team = teams.find((t) => t.id === teamId);
    if (!team) {
      reply.code(404);
      return { error: "Equipe não encontrada" };
    }
    return drivers.filter((d) => d.teamId === teamId);
  });
}
