const { websiteToPdfUseCase } = require("./websiteToPdf.usecase");

const fastify = require("fastify")({
  logger: true,
});

// Declare a route
fastify.post("/websiteToPdf", async (request, reply) => {
  const pdfBuffer = await websiteToPdfUseCase(request.body);
  reply.code(200).header("Content-Type", "application/pdf").send(pdfBuffer);
});

fastify.get("/", async (request, reply) => {
  reply.code(200).send({
    message: "ok",
  });
});

// Run the server!
fastify.listen(3000, "0.0.0.0", (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
