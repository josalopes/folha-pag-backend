const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const inss = await connection('tab_inss').select('*');
    return response.json(inss);
  },

  async create(request, response) {
    const { valor_inicial, valor_final, aliquota, teto } = request.body;
    const id = generateUniqueId();

    await connection('tab_inss').insert({
      id,
      valor_inicial,
      valor_final,
      aliquota,
      teto,
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;

    await connection("tab_inss")
      .where("id", id)
      .delete();
    return response.status(204).send();
  }
}