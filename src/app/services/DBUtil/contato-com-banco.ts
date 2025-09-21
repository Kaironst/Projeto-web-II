
export abstract class ContatoComBanco {

  //TODO, implementar a classe abstrata e trocar o any pelo tipo da interface exportada em cada uma das subclasses

  abstract getAll(): any;
  abstract get(id: number): any;
  abstract insert(obj: typeof this): any;
  abstract update(id: number, obj: typeof this): any;
  abstract delete(id: number): any

}
