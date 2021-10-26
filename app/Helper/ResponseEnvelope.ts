export default class ResponseEnvelope {
  meta: Meta
  data: unknown

  constructor(code: string, message: string) {
    this.meta = new Meta(code, message)
  }

  withData(data: unknown): ResponseEnvelope {
    this.data = data
    return this
  }
}

class Meta {
  code: string
  message: string

  constructor(code: string, message: string) {
    this.code = code
    this.message = message
  }
}
