import { verificar_admin } from "./admin.js"
import { get_setor } from "./setor.js"
verificar_admin()
const setores = await get_setor()
for (let i = 0; i < setores.length; i++){
    document.getElementById("load_setor").innerHTML += `
    <div class="ConteudoDiv">
        <h1 class="H1Conteudo">${setores[i].NOME_SETOR}</h1>
        <p>Identificação do setor: ${setores[i].IDENTIFICACAO_SETOR}</p>
        <a class="BotaoPadrao4" onclick="popUp3(${setores[i].ID_SETOR})" id="editar_setor">Editar</a>
        <a class="BotaoPadrao4" onclick="deletarSetor(${setores[i].ID_SETOR})" id="deletar_setor">Deletar</a>
    </div>
    `
}