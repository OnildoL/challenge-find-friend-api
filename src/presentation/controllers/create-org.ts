import { makeValidators } from "@/application/factories/make-validators";
import { ControllerOperationInterface } from "@/application/interfaces/controller-operation";
import { HttpRequestInterface } from "@/application/interfaces/http-request";
import { HttpResponseInterface } from "@/application/interfaces/http-response";
import { UseCaseInterface } from "@/application/interfaces/use-case";
import { created } from "../util/http-status";

export class CreateOrgController implements ControllerOperationInterface {
  constructor(private useCase: UseCaseInterface) {}

  async specificOperation(
    request: HttpRequestInterface
  ): Promise<HttpResponseInterface> {
    const body = await makeValidators().validateOrgBody(request.body);
    await this.useCase.execute(body);
    return created({});
  }
}
