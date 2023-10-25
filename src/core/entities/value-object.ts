export abstract class ValueObject<PropsType> {
  protected props: PropsType

  protected constructor(props: PropsType) {
    this.props = props
  }

  public equals(vo: ValueObject<unknown>) {
    if (vo === null || vo === undefined) {
      return false
    }

    if (vo.props === undefined) {
      return false
    }

    return JSON.stringify(vo.props) === JSON.stringify(this.props)
  }
}
