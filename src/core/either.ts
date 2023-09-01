// tratar erros
// either seria "um ou outro", erro ou sucesso

// Left / Right:
// em uma aplicação o fluxo é sempre pra frente (UI -> Controllers -> Use Case ...) simbolizando o RIGHT
// caso de erro, simbolizara o LEFT ( <- )

// Error
export class Left<L, R> {
  // poderia ser reason (motivo do erro)
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return false
  }

  isLeft(): this is Left<L, R> {
    return true
  }
}

// Success
export class Right<L, R> {
  // poderia ser result (resultado do sucesso)
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return true
  }

  isLeft(): this is Left<L, R> {
    return false
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>

// funções que criam as classes acima
export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value)
}
