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

export class DateParameter {
  public month: number
  public year: number

  constructor(month: number, year: number) {
    this.month = month
    this.year = year
  }
}
