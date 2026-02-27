import { FastifyInstance } from "fastify";
import { drivers } from "../data/drivers";
import { teams } from "../data/teams";

export async function driversRoutes(app: FastifyInstance) {
  // GET /drivers/champions - Retorna apenas campeões mundiais
  app.get("/drivers/champions", async () => {
    return drivers
      .filter((d) => d.worldChampionships > 0)
      .sort((a, b) => b.worldChampionships - a.worldChampionships);
  });

  // GET /drivers/standings - Retorna ranking de pontos
  app.get("/drivers/standings", async () => {
    return drivers
      .sort((a, b) => b.points - a.points)
      .map((d, index) => ({
        position: index + 1,
        id: d.id,
        firstName: d.firstName,
        lastName: d.lastName,
        points: d.points,
        team: teams.find((t) => t.id === d.teamId)?.name || "Unknown",
      }));
  });

  // GET /drivers - Lista todos os pilotos
  app.get<{ Querystring: { teamId?: string; nationality?: string } }>(
    "/drivers",
    async (request) => {
      const { teamId, nationality } = request.query;

      let result = [...drivers];

      if (teamId) {
        result = result.filter((d) => d.teamId === parseInt(teamId));
      }

      if (nationality) {
        result = result.filter((d) =>
          d.nationality.toLowerCase().includes(nationality.toLowerCase())
        );
      }

      return result;
    }
  );

  // GET /drivers/:id - Retorna um piloto específico
  app.get<{ Params: { id: string } }>("/drivers/:id", async (request, reply) => {
    const driver = drivers.find((d) => d.id === parseInt(request.params.id));
    if (!driver) {
      reply.code(404);
      return { error: "Piloto não encontrado" };
    }
    const team = teams.find((t) => t.id === driver.teamId);
    return { ...driver, team };
  });
}
