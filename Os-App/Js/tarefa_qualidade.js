import { Get_Tarefa_Completa } from "./tarefa.js";
import { verificar_Login_qualidade } from "./colaborador.js";
import { get_setor_filtro } from "./setor.js";
import { get_equipamento_filtro } from "./equipamento.js";
import { get_colaboradores } from "./colaborador.js";
verificar_Login_qualidade()
const tarefas = await Get_Tarefa_Completa()
CarregarTarefas(tarefas)
document.getElementById('DataFiltro').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';

    if (value.length > 2) {
        formattedValue += value.slice(0, 2) + '/';
        value = value.slice(2);
    }

    if (value.length > 2) {
        formattedValue += value.slice(0, 2) + '/';
        value = value.slice(2);
    }

    formattedValue += value;

    e.target.value = formattedValue;
});
document.getElementById('TerminoFiltro').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';

    if (value.length > 2) {
        formattedValue += value.slice(0, 2) + '/';
        value = value.slice(2);
    }

    if (value.length > 2) {
        formattedValue += value.slice(0, 2) + '/';
        value = value.slice(2);
    }

    formattedValue += value;

    e.target.value = formattedValue;
});
const setores = await get_setor_filtro()
for (let i = 0; i < setores.length; i++) {
    const setor = setores[i]
    document.getElementById("SetorFiltro").innerHTML += `
    <option value="${setor.NOME_SETOR}">${setor.NOME_SETOR}</option>
    `
}
const equipamentos = await get_equipamento_filtro()
for (let i = 0; i < equipamentos.length; i++) {
    const equipamento = equipamentos[i]
    document.getElementById("EquipamentoFiltro").innerHTML += `
    <option value="${equipamento.NOME_EQUIPAMENTO}">${equipamento.NOME_EQUIPAMENTO}</option>
    `
}
const colaboradores = await get_colaboradores()
for (let i = 0; i < colaboradores.length; i++) {
    const colaborador = colaboradores[i]
    if (colaborador.FUNCAO_COLABORADOR == "Colaborador") {
        document.getElementById("ColaboradorFiltro").innerHTML += `
    <option value="${colaborador.NOME_COLABORADOR}">${colaborador.NOME_COLABORADOR}</option>
    `
    }
}
document.getElementById("FiltrarTarefa").addEventListener("click", () => {
    let filtro = tarefas
    const setor = document.getElementById("SetorFiltro").value
    const equipamento = document.getElementById("EquipamentoFiltro").value
    const colaborador = document.getElementById("ColaboradorFiltro").value
    const ocorrencia = document.getElementById("OcorrenciaFiltro").value
    const data = document.getElementById("DataFiltro").value
    const termino = document.getElementById("TerminoFiltro").value
    const descricao = document.getElementById("DescricaoFiltro").value
    const prioridade = document.getElementById("PrioridadeFiltro").value
    if (setor != "") {
        filtro = filtro.filter(item =>
            item.NOME_SETOR != null &&
            item.NOME_SETOR != undefined &&
            item.NOME_SETOR.includes(setor)
        );
    }
    if (equipamento != "") {
        filtro = filtro.filter(item =>
            item.IDENTIFICACAO_EQUIPAMENTO != null &&
            item.IDENTIFICACAO_EQUIPAMENTO != undefined &&
            item.IDENTIFICACAO_EQUIPAMENTO.includes(equipamento)
        );
    }
    if (colaborador !== "") {
        filtro = filtro.filter(item =>
            item.IDENTIFICACAO_COLABORADOR !== null &&
            item.IDENTIFICACAO_COLABORADOR !== undefined &&
            item.IDENTIFICACAO_COLABORADOR.includes(colaborador)
        );
    }
    if (ocorrencia != "") {
        filtro = filtro.filter(item => item.OCORRENCIA_TAREFA.includes(ocorrencia))
    }
    if (data != "") {
        filtro = filtro.filter(item => item.DATA_TAREFA.includes(data))
    }
    if (termino != "") {
        filtro = filtro.filter(item => item.TERMINO_TAREFA.includes(termino))
    }
    if (descricao != "") {
        filtro = filtro.filter(item => item.DESCRICAO_TAREFA.includes(descricao))
    }
    if (prioridade != "") {
        filtro = filtro.filter(item => item.PRIORIDADE_TAREFA.includes(prioridade))
    }
    document.getElementById("load_tarefa").innerHTML = ""
    CarregarTarefas(filtro)
})
document.getElementById("LimparFiltro").addEventListener("click", () => {
    location.reload()
})
function CarregarTarefas(data) {
    for (let i = 0; i < data.length; i++) {
        const tarefa = data[i]
        if (tarefa.VISTO_QUALIDADE == true || tarefa.FINALIZADA_TAREFA == 0 || tarefa.FINALIZADA_TAREFA == false) {
        } else {
            let equipamento = tarefa.NOME_EQUIPAMENTO || "N/A"
            let setor = tarefa.NOME_SETOR || "N/A"
            let colaborador = tarefa.NOME_COLABORADOR || "N/A"
            let assist = tarefa.ASSISTANT_COLABORADORES
            if (assist != "" && assist != null){
                assist = `, ${assist}`
            } else {
                assist = ""
            }
                document.getElementById("load_tarefa").innerHTML += `
                <div class="ConteudoDiv">
                    <h1 class="H1Conteudo">${tarefa.OCORRENCIA_TAREFA}</h1>
                    <p><spam class="TotalQualidade"><strong>Descrição:</strong> <spam class="tarefasQualidade">${tarefa.DESCRICAO_TAREFA}</spam></spam></p>
                    <p><spam class="TotalQualidade"><strong>Classificação: </strong> <spam class="${tarefa.CLASSIFICACAO_TAREFA}">${tarefa.CLASSIFICACAO_TAREFA} </spam></spam></p>
                    <p><spam class ="TotalQualidade"><strong>Prioridade:</strong> ${tarefa.PRIORIDADE_TAREFA}</spam></p>
                    <p><spam class ="TotalQualidade"><strong>Colaborador:</strong> ${colaborador}${assist}</spam></p>
                    <p><spam class ="TotalQualidade"><strong>Setor:</strong> ${setor}</spam></p>
                    <p><spam class ="TotalQualidade"><strong>Equipamento:</strong> ${equipamento}</spam></p>
                    <p><spam class ="TotalQualidade"><strong>Tempo decorrido:</strong> ${tarefa.MINUTOS_TAREFA} minutos</spam></p>
                    <p><spam class ="TotalQualidade"><strong>Data de início:</strong> ${tarefa.DATA_TAREFA}</spam></p>
                    <p><spam class ="TotalQualidade"><strong>Data de término:</strong> ${tarefa.TERMINO_TAREFA}</spam></p>
                    <a class="BotaoPadrao4" onclick="EditarTarefaQualidade(${tarefa.ID_TAREFA})" id="editar_tarefa${tarefa.ID_TAREFA}">Editar</a>
                </div>
                `
        }
    }
}