import { makeValidators } from "@/application/factories/make-validators";
import { ControllerOperationInterface } from "@/application/interfaces/controller-operation";
import { HttpRequestInterface } from "@/application/interfaces/http-request";
import { HttpResponseInterface } from "@/application/interfaces/http-response";
import { UseCaseInterface } from "@/application/interfaces/use-case";
import { success } from "../util/http-status";

export class AuthenticateController implements ControllerOperationInterface {
  constructor(private useCase: UseCaseInterface) {}
  async specificOperation(
    request: HttpRequestInterface
  ): Promise<HttpResponseInterface> {
    const body = await makeValidators().validateAuthenticate(request.body);
    const org = await this.useCase.execute(body);
    return success(org);
  }
}
