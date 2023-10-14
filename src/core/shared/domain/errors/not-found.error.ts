import { Entity } from '../entity';

export class NotFoundError extends Error {
  constructor(
    id: any[] | any,
    entityClass: new (...args: any[]) => Entity, // recebe um constructor que devolve uma entity
  ) {
    const idsMessage = Array.isArray(id) ? id.join(', ') : id;
    super(`${entityClass.name} Not Found using ID ${idsMessage}`);
    this.name = 'NotFoundError';
  }
}
