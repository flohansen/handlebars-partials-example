import FrameController from "./server/controller/FrameController";
import Server from "./server/Server";

new Server(
  {
    port: 3000,
  },
  new FrameController()
).start();
