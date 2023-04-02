import { ControllerOperationInterface } from "@/application/interfaces/controller-operation";
import { HttpRequestInterface } from "@/application/interfaces/http-request";
import { HttpResponseInterface } from "@/application/interfaces/http-response";
import { serverError } from "../util/http-status";

export class WebController {
  constructor(private controllerOperation: ControllerOperationInterface) {}
  async execute(request: HttpRequestInterface): Promise<HttpResponseInterface> {
    try {
      return await this.controllerOperation.specificOperation(request);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
