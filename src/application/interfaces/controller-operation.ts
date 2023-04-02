import { HttpRequestInterface } from "./http-request";
import { HttpResponseInterface } from "./http-response";

export interface ControllerOperationInterface {
  specificOperation(
    request: HttpRequestInterface
  ): Promise<HttpResponseInterface>;
}
