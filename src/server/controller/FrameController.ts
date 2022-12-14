import { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs/promises";
import Handlebars from "handlebars";
import path from "path";

export default class FrameController {
  public async handleFrame(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const { frame } = request.params as Record<string, string>;

    const frameDir = path.join(__dirname, "..", "..", "..", "frames", frame);
    const templateFileName = path.join(frameDir, "template.hbs");
    const templateFileContent = await fs.readFile(templateFileName, {
      encoding: "utf8",
    });

    const serverFileName = path.join(frameDir, "server.ts");
    const serverFile = require(serverFileName);
    const map = serverFile.map;

    const pdpFrameInput = {
      variations: [
        { priceCents: 999, name: "Super Test Variation 2000" },
        { priceCents: 333, name: "Super Test Variation 6000" },
      ],
    };

    const template = Handlebars.compile(templateFileContent);
    reply
      .status(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(template(map(pdpFrameInput)));
  }
}
