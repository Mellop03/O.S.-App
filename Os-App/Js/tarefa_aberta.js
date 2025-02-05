import { verificar_Login } from "./colaborador.js";
import { Get_Tarefa_Aberta } from "./tarefa.js";
verificar_Login()
const tarefas = await Get_Tarefa_Aberta()
Carregar_Tarrefas(tarefas)
function Carregar_Tarrefas(tarefas){
    if (tarefas == false){
        document.getElementById("load_tarefa").innerHTML = `
            <h1>Não há tarefas abertas</h1>
        `
    } else {
        for (let i = 0; i < tarefas.length; i++){
            let tarefa = tarefas[i]
            let classname = tarefa.CLASSIFICACAO_TAREFA
            let priority = tarefa.PRIORIDADE_TAREFA
            let equipamento = tarefa.NOME_EQUIPAMENTO || "N/A"
            let setor = tarefa.NOME_SETOR || "N/A"
            if (priority == "A"){
                priority = "Limite de 1 mês"
            } else if (priority == "A+"){
                priority = "Limite de 1 semana"
            } else if (priority == "A++"){
                priority = "Limite de 1 dia"
            }
            document.getElementById("load_tarefa").innerHTML += `
                <div class="ConteudoDiv">
                    <h1 class="H1Conteudo">${tarefa.OCORRENCIA_TAREFA}</h1>
                    <p><spam class="TotalQualidade"><strong>Descrição:</strong> <spam class="tarefasQualidade">${tarefa.DESCRICAO_TAREFA}</spam></spam></p>
                    <p><spam class="TotalQualidade"><strong>Classificação: </strong> <spam class="${classname}">${tarefa.CLASSIFICACAO_TAREFA} </spam></spam></p>
                    <p><spam class ="TotalQualidade"><strong>Prioridade:</strong> ${tarefa.PRIORIDADE_TAREFA} (${priority})</spam></p>
                    <p><spam class ="TotalQualidade"><strong>Setor:</strong> ${setor}</spam></p>
                    <p><spam class ="TotalQualidade"><strong>Equipamento:</strong> ${equipamento}</spam></p>
                    <p><spam class ="TotalQualidade"><strong>Tempo decorrido:</strong> ${tarefa.MINUTOS_TAREFA} minutos</spam></p>
                    <p><spam class ="TotalQualidade"><strong>Data de início:</strong> ${tarefa.DATA_TAREFA}</spam></p>
                    <p><spam class ="TotalQualidade"><strong>Data limite de término:</strong> ${tarefa.TERMINO_TAREFA}</spam></p>
                    <a class="BotaoPadrao4" onclick="ConcluirTarefa(${tarefa.ID_TAREFA})">Marcar como concluída</a>
                </div>
                `
        }
    }
}