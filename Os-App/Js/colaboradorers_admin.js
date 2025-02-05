import { verificar_admin } from "./admin.js";
import { get_colaboradores } from "./colaborador.js";
verificar_admin()
const colaboradores = await get_colaboradores()
for (let i = 0; i < colaboradores.length; i++){
    document.getElementById("load_colaborador").innerHTML += `
    <div class="ConteudoDiv">
        <h1 class="H1Conteudo">${colaboradores[i].NOME_COLABORADOR}</h1>
        <p>Identificação do colaborador: ${colaboradores[i].IDENTIFICACAO_COLABORADOR}</p>
        <p>Classificação: ${colaboradores[i].FUNCAO_COLABORADOR}</p>
        <a class="BotaoPadrao4" onclick="popUp(${colaboradores[i].ID_COLABORADOR})" id="editar_colaborador">Editar</a> 
        <a class="BotaoPadrao4" id="excluir_colaborador" onclick="excluir(${colaboradores[i].ID_COLABORADOR})">Excluir</a>
    </div>
    `
}