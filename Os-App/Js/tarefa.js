import { tarefaURL } from "./constants.js";
import { FecharPopUp } from "./colaborador.js";
export async function Adicionar_Tarefa(ocorrencia, descricao, inicio, termino, classificacao, minutos, 
    setor, equipamento, colaborador, visto, texto, prioridade, assistencia1, assistencia2, assistencia3,
    assistencia4) {
    const request = await fetch(tarefaURL + `/novatarefa`, {
        method: 'POST',
        body: JSON.stringify({
            "OCORRENCIA_TAREFA": ocorrencia,
            "DESCRICAO_TAREFA": descricao,
            "DATA_TAREFA": inicio,
            "TERMINO_TAREFA": termino,
            "CLASSIFICACAO_TAREFA": classificacao,
            "MINUTOS_TAREFA": minutos,
            "ID_SETOR": setor,
            "ID_EQUIPAMENTO": equipamento,
            "PRIORIDADE_TAREFA": prioridade,
            "ID_COLABORADOR": colaborador,
            "VISTO_QUALIDADE": visto,
            "TEXTO_QUALIDADE": texto,
            "TAREFA_ASSIST1": assistencia1,
            "TAREFA_ASSIST2": assistencia2,
            "TAREFA_ASSIST3": assistencia3,
            "TAREFA_ASSIST4": assistencia4
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (request.status == 200) {
        document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Tarefa criada com sucesso!</strong>
                </h1>
                <button class="BotaoPadrao2" id="FecharPopUp">Voltar</button>    
            </div>
        </div>
        `
        document.getElementById("FecharPopUp").addEventListener("click", FecharPopUp)
    } else {
        document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Não foi possível criar a tarefa</strong>
                </h1>
                <button class="BotaoPadrao2" id="FecharPopUp">Voltar</button>    
            </div>
        </div>
        `
        document.getElementById("FecharPopUp").addEventListener("click", FecharPopUp)
    }
}
export async function Get_Tarefa_Completa(){
    const request = await fetch(tarefaURL + `/listarcompleta`)
    if(request.status == 200){
        const data = await request.json()
        return data
    } else {
        return false
    }
}
export async function Get_Tarefa_Tabela(){
    const request = await fetch(tarefaURL + `/listarcompletatabela`)
    if (request.status == 200){
        const data = await request.json()
        return data
    } else {
        return false
    }
}
export async function Get_Tarefa_Aberta() {
    const request = await fetch(tarefaURL+ "/listaraberta")
    if (request.status == 200){
        const data = await request.json()
        return data
    } else {
        return false
    }
}
export async function Abrir_Tarefa(ocorrencia, descricao, inicio, termino, classificacao, 
    minutos, setor, equipamento, prioridade) {
    const request = await fetch(tarefaURL+ `/abrirtarefa`, {
        method: "POST",
        body: JSON.stringify({
            "OCORRENCIA_TAREFA": ocorrencia,
            "DESCRICAO_TAREFA": descricao,
            "DATA_TAREFA": inicio,
            "TERMINO_TAREFA": termino,
            "CLASSIFICACAO_TAREFA": classificacao,
            "MINUTOS_TAREFA": minutos,
            "ID_SETOR": setor,
            "ID_EQUIPAMENTO": equipamento,
            "PRIORIDADE_TAREFA": prioridade
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (request.status == 200) {
        document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>O.S. aberta com sucesso!</strong>
                </h1>
                <button class="BotaoPadrao2" id="FecharPopUp">Voltar</button>    
            </div>
        </div>
        `
        document.getElementById("FecharPopUp").addEventListener("click", FecharPopUp)
    } else {
        document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Não foi possível abrir a O.S.</strong>
                </h1>
                <button class="BotaoPadrao2" id="FecharPopUp">Voltar</button>    
            </div>
        </div>
        `
        document.getElementById("FecharPopUp").addEventListener("click", FecharPopUp)
    }
}