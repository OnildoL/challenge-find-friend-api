export interface UseCaseInterface {
  execute(request: any): Promise<any>;
}
