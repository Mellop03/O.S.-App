import { equipamentoURL } from "./constants.js";
import { verificar_admin } from "./admin.js";
import { get_equipamento } from "./equipamento.js"
verificar_admin()
const equipamentos = await get_equipamento()
for (let i = 0; i < equipamentos.length; i++){
    document.getElementById("load_equipamento").innerHTML += `
    <div class="ConteudoDiv">
        <h1 class="H1Conteudo">${equipamentos[i].NOME_EQUIPAMENTO}</h1>
        <p>Identificação do equipamento: ${equipamentos[i].IDENTIFICACAO_EQUIPAMENTO}</p>
        <a class="BotaoPadrao4" onclick="popUp4(${equipamentos[i].ID_EQUIPAMENTO})" id="editar_equipamento">Editar</a> 
        <a class="BotaoPadrao4" id="excluir_equipamento" onclick="deletarEquipamento(${equipamentos[i].ID_EQUIPAMENTO})">Excluir</a>
    </div>
    `
}
