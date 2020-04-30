const connection = require('../database/connection');

module.exports = {

  async calcular(request, response) {

    const {
      salarioBruto,
      valorHorasExtras,
      valorInss,
      quantidadeDeFaltas,
      numeroDeDependentes,
    } = request.body;

    const valorFaltas = quantidadeDeFaltas * salarioBruto / 30;
    const valorBase = salarioBruto + valorHorasExtras - valorInss - valorFaltas;

    const [base] = await connection('tab_irrf')
      .max('valor_final')

    const [descontoPorDependente] = await connection('tab_irrf')
      .select('valor_desc_dependente')

    const [percentual] = await connection("tab_irrf")
      .select('aliquota', 'valor_abatimento')
      .where('valor_inicial', '<=', valorBase)
      .andWhere('valor_final', '>=', valorBase);
    
    const descontoDependentes = descontoPorDependente.valor_desc_dependente * numeroDeDependentes;

    let valorPagar = percentual.aliquota * (valorBase - descontoDependentes);
    valorPagar = valorPagar - percentual.valor_abatimento;

    if (valorPagar < 0) {
      valorPagar = 0;
    }
    return response.json(valorPagar);
  }
}
