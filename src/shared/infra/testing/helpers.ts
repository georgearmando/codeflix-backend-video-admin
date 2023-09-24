import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Config } from "../config";

export function setupSequelize(options: SequelizeOptions = {}) {
  let _sequelize: Sequelize;

  beforeAll(async () => {
    _sequelize = new Sequelize({
      ...Config.db(),
      ...options, 
      // Caso forem passadas as options vao sobrescrever os valores do Config
      // uma vez que estao depois do Config
    });
  });

  beforeEach(async () => await _sequelize.sync({ force: true }));

  afterAll(async () => await _sequelize.close());

  return {
    get sequelize() {
      return _sequelize;
    },
  };
}