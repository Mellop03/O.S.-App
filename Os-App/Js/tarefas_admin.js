import { Get_Tarefa_Tabela } from "./tarefa.js";
import { verificar_admin } from "./admin.js";
import { get_setor_filtro } from "./setor.js";
import { get_equipamento_filtro } from "./equipamento.js";
import { get_colaboradores } from "./colaborador.js";
verificar_admin()
let tarefas = await Get_Tarefa_Tabela();
const cabecalho = `
    <tr class="CabecalhoTabela">
            <th class="Linha2 Verde">
                Data de início
            </th>
            <th class="Linha2 Azul">
                Cód. setor
            </th>
            <th class="Linha2 Verde">
                Nome setor
            </th>
            <th class="Linha2 Azul">
                Cód. equipamento
            </th>
            <th class="Linha2 Roxo">
                Nome do equipamento
            </th>
            <th class="Linha2 Verde">
                Nº da tarefa
            </th>
            <th class="Linha2 Verde">
                Ocorrência
            </th>
            <th class="Linha2 Verde">
                Descrição
            </th>
            <th class="Linha2 Verde">
                Classificação
            </th>
            <th class="Linha2 Azul">
                Prioridade
            </th>
            <th class="Linha2 Verde">
                Tempo em minutos
            </th>
            <th class="Linha2 Roxo">
                Data de finalização
            </th>
            <th class="Linha3 Azul">
                Cód. colaborador
            </th>
            <th class="NoPrint Linha2 Azul"></th>
        </tr>
    `
let limiteRender = 50
let minimoRender = 0
document.getElementById("PrimeiraPagina").addEventListener("click", () => {
    minimoRender = 0
    limiteRender = 50
    document.getElementById("tabela").innerHTML = ""
    document.getElementById("tabela").innerHTML = cabecalho
    Carregar_tarefa(tarefas)
})
document.getElementById("PaginaAnterior").addEventListener("click", () => {
    console.log(minimoRender)
    if (minimoRender > 0) {
        minimoRender = minimoRender - 50
        limiteRender = limiteRender - 50
        document.getElementById("tabela").innerHTML = ""
        document.getElementById("tabela").innerHTML = cabecalho
        Carregar_tarefa(tarefas)
    }
})
document.getElementById("ProximaPagina").addEventListener("click", () => {
    if (limiteRender < tarefas.length) {
        minimoRender = minimoRender + 50
        limiteRender = limiteRender + 50
        document.getElementById("tabela").innerHTML = ""
        document.getElementById("tabela").innerHTML = cabecalho
        Carregar_tarefa(tarefas)
    }
})
document.getElementById("UltimaPagina").addEventListener("click", () => {
    minimoRender = tarefas.length - 50
    if (minimoRender > 0){
        limiteRender = tarefas.length
        document.getElementById("tabela").innerHTML = ""
        document.getElementById("tabela").innerHTML = cabecalho
        Carregar_tarefa(tarefas)
    }
})
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
})
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
})
document.getElementById("Imprimir").addEventListener("click", () => {
    limiteRender = tarefas.length
    minimoRender = 0
    Carregar_tarefa(tarefas)
    window.print()
    window.reload()
})
document.getElementById("LimparFiltro").addEventListener("click", () => {
    location.reload()
})
document.getElementById("BaixarPDF").addEventListener("click", () => {
    limiteRender = tarefas.length
    minimoRender = 0
    Carregar_tarefa(tarefas)
    let d1 = new Date()
    let d2 = new Date()
    let d3 = new Date()
    const dia = d1.getDate()
    const mes = d2.getMonth() + 1
    const ano = d3.getFullYear()
    const dataC = `${dia}.${mes}.${ano}`
    const Baixar = document.getElementById("tabela")
    let opcoes = {
        margin: 0,
        filename: `Tabela_${dataC}.pdf`,
        image: { type: "jpeg", quality: 2 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'A4', orientation: 'landscape' }
    }
    html2pdf().from(Baixar).set(opcoes).save();
    PopUpPDF()
})
Carregar_tarefa(tarefas)
function Carregar_tarefa(dados) {
    let numero = 0
    for (let i = 0; i < dados.length; i++) {
        if (minimoRender <= numero && numero < limiteRender) {
            let verificarNumero = numero % 2
            let CorNum = ""
            let tarefa = dados[i]
            let minutos = tarefa.MINUTOS_TAREFA
            let classificacao = tarefa.CLASSIFICACAO_TAREFA
            let IdEquipamento = tarefa.IDENTIFICACAO_EQUIPAMENTO || "N/A"
            let NomeEquipamento = tarefa.NOME_EQUIPAMENTO || "Equipamento excluído"
            let IdSetor = tarefa.IDENTIFICACAO_SETOR || "N/A"
            let NomeSetor = tarefa.NOME_SETOR || "Setor excluído"
            let IdColaborador = tarefa.IDENTIFICACAO_COLABORADOR || "N/A"
            let assist = tarefa.ASSISTANT_COLABORADORES
            let splitted = ""
            if (assist == "" || assist == null){
                assist = ""
            } else {
                splitted = assist.split(" e ")
                if(splitted.length == 3){
                    assist = `, ${splitted[0]}, ${splitted[1]} e ${splitted[2]}`
                } else if (splitted.length == 4){
                    assist = `, ${splitted[0]}, ${splitted[1]}, ${splitted[2]} e ${splitted[3]}`
                } else {
                    assist = `, ${assist}`
                }
            }
            if (verificarNumero == 0) {
                CorNum = ""
            } else {
                CorNum = "Cinza"
            }
            if (classificacao == "Corretiva") {
                classificacao = "Vermelho"
            } else if (classificacao == "Melhoria") {
                classificacao = "Verde2"
            } else if (classificacao == "Preventiva") {
                classificacao = "Azul2"
            }
            if (IdEquipamento == null || IdEquipamento == "" || NomeEquipamento == null || NomeEquipamento == "") {
                NomeEquipamento = "Equipamento excluído"
                IdEquipamento = "N/A"
            }
            if (IdColaborador == "" || IdColaborador == null) {
                IdColaborador = "N/A"
            }
            if (IdSetor == "" || IdSetor == null || NomeSetor == "" || NomeSetor == null) {
                NomeSetor = "Setor excluído"
                IdSetor = "N/A"
            }
            if (minutos == 0) {
                minutos = "Em andamento"
            }
            document.getElementById("tabela").innerHTML += `
                        <tr>
                            <td class="Linha ${CorNum}">
                                ${tarefa.DATA_TAREFA}
                            </td>
                            <td class="Linha Azul">
                                ${IdSetor}
                            </td>
                            <td class="Linha ${CorNum}">
                                ${NomeSetor}
                            </td>
                            <td class="Linha Azul">
                                ${IdEquipamento}
                            </td>
                            <td class="Linha ${CorNum}">
                                ${NomeEquipamento}
                            </td>
                            <td class="Linha ${CorNum}">
                                ${tarefa.ID_TAREFA}
                            </td>
                            <td class="Linha ${CorNum}">
                                ${tarefa.OCORRENCIA_TAREFA}
                            </td>
                            <td class="Linha ${CorNum}">
                                ${tarefa.DESCRICAO_TAREFA}
                            </td>
                            <td class="Linha ${classificacao}">
                                ${tarefa.CLASSIFICACAO_TAREFA}
                            </td>
                            <td class="Linha ${CorNum}">
                                ${tarefa.PRIORIDADE_TAREFA}
                            </td>
                            <td class="Linha ${CorNum}">
                                ${minutos}
                            </td>
                            <td class="Linha ${CorNum}">
                                ${tarefa.TERMINO_TAREFA}
                            </td>
                            <td class="Linha Azul">
                                ${IdColaborador}${assist}
                            </td>
                            <td class="Linha Azul NoPrint">
                                <a onclick="DetalhesTarefa(${tarefa.ID_TAREFA})" class="BotaoPadrao6">Detalhes</a>
                            </td>
                        </tr>
            `
        }
        numero++
    }
    document.getElementById("PaginacaoDiv").innerHTML = `
    <p>${numero} ordens de serviço encontradas</p>
    `
}
const setores = await get_setor_filtro()
for (let i = 0; i < setores.length; i++) {
    const setor = setores[i]
    document.getElementById("SetorFiltro").innerHTML += `
    <option value="${setor.IDENTIFICACAO_SETOR}">${setor.NOME_SETOR}</option>
    `
}
const equipamentos = await get_equipamento_filtro()
for (let i = 0; i < equipamentos.length; i++) {
    const equipamento = equipamentos[i]
    document.getElementById("EquipamentoFiltro").innerHTML += `
    <option value="${equipamento.IDENTIFICACAO_EQUIPAMENTO}">${equipamento.NOME_EQUIPAMENTO}</option>
    `
}
const colaboradores = await get_colaboradores()
for (let i = 0; i < colaboradores.length; i++) {
    const colaborador = colaboradores[i]
    if (colaborador.FUNCAO_COLABORADOR == "Colaborador") {
        document.getElementById("ColaboradorFiltro").innerHTML += `
    <option value="${colaborador.IDENTIFICACAO_COLABORADOR}">${colaborador.NOME_COLABORADOR}</option>
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
    const classificacao = document.getElementById("ClassificacaoFiltro").value
    const numeroTarefa = document.getElementById("NumberFiltro").value
    const visto = document.getElementById("VistoFiltro").checked
    const open = document.getElementById("AbertoFiltro").checked
    if (setor != "") {
        filtro = filtro.filter(item =>
            item.IDENTIFICACAO_SETOR != null &&
            item.IDENTIFICACAO_SETOR != undefined &&
            item.IDENTIFICACAO_SETOR == setor
        );
    }
    if (equipamento != "") {
        filtro = filtro.filter(item =>
            item.IDENTIFICACAO_EQUIPAMENTO != null &&
            item.IDENTIFICACAO_EQUIPAMENTO != undefined &&
            item.IDENTIFICACAO_EQUIPAMENTO == equipamento
        );
    }
    if (colaborador !== "") {
        filtro = filtro.filter(item =>
            item.IDENTIFICACAO_COLABORADOR !== null &&
            item.IDENTIFICACAO_COLABORADOR !== undefined &&
            item.IDENTIFICACAO_COLABORADOR == colaborador ||
            item.ASSISTANT_COLABORADORES == colaborador
        );
    }
    if (prioridade !== "") {
        filtro = filtro.filter(item =>
            item.PRIORIDADE_TAREFA !== null &&
            item.PRIORIDADE_TAREFA !== undefined &&
            item.PRIORIDADE_TAREFA == prioridade
        );
    }
    if (classificacao !== "") {
        filtro = filtro.filter(item =>
            item.CLASSIFICACAO_TAREFA !== null &&
            item.CLASSIFICACAO_TAREFA !== undefined &&
            item.CLASSIFICACAO_TAREFA == classificacao
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
    if (visto) {
        filtro = filtro.filter(item => item.VISTO_QUALIDADE == visto)
    }
    if (numeroTarefa) {
        filtro = filtro.filter(item => item.ID_TAREFA >= numeroTarefa)
    }
    if (open) {
        filtro = filtro.filter(item => item.FINALIZADA_TAREFA == 0)
    }
    document.getElementById("tabela").innerHTML = ""
    document.getElementById("tabela").innerHTML = cabecalho
    tarefas = filtro
    limiteRender = 50
    minimoRender = 0
    Carregar_tarefa(filtro)
})
function PopUpPDF() {
    document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv">
                <h1 class="TextoH1">
                    O download do arquivo está em execução!
                </h1>
                <p>
                     Isso pode demorar um pouco.
                </p>
                <br>
                <p>
                    Espere o download finalizar e feche este aviso.
                </p>
                <br>
                <br>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
            </div>
        </div>`
}
