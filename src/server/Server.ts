import fastify, { FastifyInstance } from "fastify";
import FrameController from "./controller/FrameController";
import Handlebars from "handlebars";
import path from "path";
import fs from "fs";

type ServerProps = {
  port: number;
};

export default class Server {
  private server: FastifyInstance;

  constructor(
    private props: ServerProps,
    private frameController: FrameController
  ) {
    this.server = fastify();
    this.registerRoutes();
    this.registerComponents();
  }

  public async start(): Promise<string> {
    return this.server.listen({
      port: this.props.port,
    });
  }

  private registerRoutes(): void {
    this.server.get("/frames/:frame", this.frameController.handleFrame);
  }

  private registerComponents(): void {
    const componentNames = fs.readdirSync(
      path.join(__dirname, "..", "..", "components")
    );
    for (const componentName of componentNames) {
      const componentDirectory = path.join(__dirname, "..", "..", "components");
      const templateFileName = path.join(
        componentDirectory,
        componentName,
        "template.hbs"
      );
      const serverFileName = path.join(
        componentDirectory,
        componentName,
        "server.ts"
      );

      if (fs.existsSync(templateFileName)) {
        const templateSource = fs.readFileSync(templateFileName, {
          encoding: "utf8",
        });

        const template = Handlebars.compile(templateSource);
        const serverFile = require(serverFileName);
        const map = serverFile.map;

        Handlebars.registerPartial(componentName, (ctx, options) => {
          return template(map(ctx));
        });
      }
    }
  }
}
