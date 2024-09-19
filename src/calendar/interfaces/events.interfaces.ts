export interface Events {
  _id?: number,
  title: string,
  notes: string,
  start: Date,
  end: Date,
  bgColor: string,
  user?: {
    _id: string,
    name: string
  }
}