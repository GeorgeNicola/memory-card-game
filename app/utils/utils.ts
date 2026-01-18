export enum IOrderByDirection {
  ASC = "asc",
  DESC = "desc",
}

export interface IOrderBy {
  time?: IOrderByDirection;
  moves?: IOrderByDirection;
  name?: IOrderByDirection;
  difficulty?: IOrderByDirection;
}
