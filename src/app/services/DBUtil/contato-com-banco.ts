
export abstract class ContatoComBanco {

  //TODO, implementar a classe abstrata e trocar o any pelo tipo da interface exportada em cada uma das subclasses

  abstract getAll(): any;
  abstract get(id: number): any;
  abstract criar(obj: object): any;
  abstract update(id: number, obj: object): any;
  abstract delete(id: number): any

}
