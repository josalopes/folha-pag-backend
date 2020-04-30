const connection = require('../database/connection');

module.exports = {

  async calcular(request, response) {

    const {
      salarioBruto,
      valorHorasExtras,
      quantidadeDeFaltas,
    } = request.body;

    const valorFaltas = quantidadeDeFaltas * salarioBruto / 30;
    const valorBase = salarioBruto + valorHorasExtras - valorFaltas;
    
    const [ base ] = await connection('tab_inss')
      .max('valor_final')
      
    const [ tetoMaximo ] = await connection('tab_inss')
      .select('teto')
    
    const [ percentual ] = await connection("tab_inss")
      .select('aliquota')
      .where('valor_inicial', '<=', valorBase)
      .andWhere('valor_final', '>=', valorBase);

    let valorPagar = percentual.aliquota * valorBase;

    if (valorBase > base['max(`valor_final`)']) {
      valorPagar = tetoMaximo.teto;
    }
    
    return response.json(valorPagar);
  }
}
