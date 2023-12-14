export class ResponseModel<T> {
  public body: T
  public result: number
  public message: string

  constructor(body: T, result: number, message: string) {
    this.body = body
    this.result = result
    this.message = message
  }
}
