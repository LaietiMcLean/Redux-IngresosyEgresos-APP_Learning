export class User {
  constructor(
    public uid: string | undefined | null,
    public name: string,
    public email: string | undefined | null
  ) {}
}
