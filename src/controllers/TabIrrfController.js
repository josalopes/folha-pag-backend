const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const irrf = await connection('tab_irrf').select('*');
    return response.json(irrf);
  },

  async create(request, response) {
    const {
      ano_base,
      valor_inicial,
      valor_final,
      aliquota,
      valor_abatimento,
      valor_desc_dependente
    } = request.body;
    
    const id = generateUniqueId();

    await connection('tab_irrf').insert({
      id,
      ano_base,
      valor_inicial,
      valor_final,
      aliquota,
      valor_abatimento,
      valor_desc_dependente
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;

    await connection("tab_irrf")
      .where("id", id)
      .delete();
    return response.status(204).send();
  }
}