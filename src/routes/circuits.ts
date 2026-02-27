import { FastifyInstance } from "fastify";
import { circuits } from "../data/circuits";

export async function circuitsRoutes(app: FastifyInstance) {
  // GET /circuits/longest - Retorna os circuitos ordenados por tamanho
  app.get("/circuits/longest", async () => {
    return [...circuits]
      .sort((a, b) => b.length - a.length)
      .map((c) => ({
        id: c.id,
        name: c.name,
        country: c.country,
        length: c.length,
      }));
  });

  // GET /circuits - Lista todos os circuitos
  app.get<{ Querystring: { country?: string } }>("/circuits", async (request) => {
    const { country } = request.query;

    if (country) {
      return circuits.filter((c) => c.country.toLowerCase().includes(country.toLowerCase()));
    }

    return circuits;
  });

  // GET /circuits/:id - Retorna um circuito específico
  app.get<{ Params: { id: string } }>("/circuits/:id", async (request, reply) => {
    const circuit = circuits.find((c) => c.id === parseInt(request.params.id));
    if (!circuit) {
      reply.code(404);
      return { error: "Circuito não encontrado" };
    }
    return circuit;
  });
}
