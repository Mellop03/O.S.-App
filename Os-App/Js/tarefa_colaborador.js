import { FecharPopUp, verificar_Login } from "./colaborador.js";
import { get_equipamento } from "./equipamento.js";
import { get_setor } from "./setor.js";
import { get_colaboradores } from "./colaborador.js";
import { Adicionar_Tarefa } from "./tarefa.js";
verificar_Login()
const equipamentos = await get_equipamento()
for (let i = 0; i < equipamentos.length; i++) {
    const equipamento = equipamentos[i]
    document.getElementById("Tarefa_equipamento").innerHTML += `
        <option value="${equipamento.ID_EQUIPAMENTO}">${equipamento.NOME_EQUIPAMENTO}</option>
    `
}
const setores = await get_setor()
for (let i = 0; i < setores.length; i++) {
    const setor = setores[i]
    document.getElementById("Tarefa_setor").innerHTML += `
        <option value="${setor.ID_SETOR}">${setor.NOME_SETOR}</option>
    `
}
const userVerify = JSON.parse(localStorage.getItem("LoggedIn"))
const colaboradores = await get_colaboradores()
for (let i = 0; i < colaboradores.length; i++) {
    const colaborador = colaboradores[i]
    if (colaborador.NOME_COLABORADOR != userVerify.Nome && colaborador.FUNCAO_COLABORADOR != "Qualidade") {
        document.getElementById("Tarefa_assistencia").innerHTML += `
        <option value="${colaborador.ID_COLABORADOR}">${colaborador.NOME_COLABORADOR}</option>
        `
        document.getElementById("Tarefa_assistencia2").innerHTML += `
        <option value="${colaborador.ID_COLABORADOR}">${colaborador.NOME_COLABORADOR}</option>
        `
        document.getElementById("Tarefa_assistencia3").innerHTML += `
        <option value="${colaborador.ID_COLABORADOR}">${colaborador.NOME_COLABORADOR}</option>
        `
        document.getElementById("Tarefa_assistencia4").innerHTML += `
        <option value="${colaborador.ID_COLABORADOR}">${colaborador.NOME_COLABORADOR}</option>
        `
    }
}
const verifyToggle = document.getElementById("Tarefa_toggle")
verifyToggle.addEventListener("click", () => {
    if (verifyToggle.checked == true) {
        document.getElementById("Tarefa_assistencia").style.display = "block"
        document.getElementById("Tarefa_assistencia2").style.display = "block"
        document.getElementById("Tarefa_assistencia3").style.display = "block"
        document.getElementById("Tarefa_assistencia4").style.display = "block"
    } else {
        document.getElementById("Tarefa_assistencia").style.display = "none"
        document.getElementById("Tarefa_assistencia2").style.display = "none"
        document.getElementById("Tarefa_assistencia3").style.display = "none"
        document.getElementById("Tarefa_assistencia4").style.display = "none"
    }
})
document.getElementById('Tarefa_inicio').addEventListener('input', function (e) {
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
document.getElementById('Tarefa_termino').addEventListener('input', function (e) {
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
const textarea = document.getElementById('Tarefa_descricao');
textarea.addEventListener('input', () => {
  textarea.style.height = 'auto'
  textarea.style.height = `${textarea.scrollHeight}px`
});
document.getElementById("AdicionarTarefa").addEventListener('click', () => {
    const ocorrencia = document.getElementById("Tarefa_ocorrencia").value
    const descricao = document.getElementById("Tarefa_descricao").value
    const classificacao = document.getElementById("Tarefa_classificacao").value
    const setor = document.getElementById("Tarefa_setor").value
    const equipamento = document.getElementById("Tarefa_equipamento").value
    const inicio = document.getElementById("Tarefa_inicio").value
    const termino = document.getElementById("Tarefa_termino").value
    const minutos = document.getElementById("Tarefa_minutos").value
    const prioridade = document.getElementById("Tarefa_prioridade").value
    const assistencia = document.getElementById("Tarefa_toggle").checked
    let assistencia1 = document.getElementById("Tarefa_assistencia").value
    let assistencia2 = document.getElementById("Tarefa_assistencia2").value
    let assistencia3 = document.getElementById("Tarefa_assistencia3").value
    let assistencia4 = document.getElementById("Tarefa_assistencia4").value
    if (ocorrencia == null || ocorrencia == "" || descricao == null || descricao == "" ||
        classificacao == null || classificacao == "" || setor == null || setor == "" ||
        equipamento == null || equipamento == "" || inicio == null || inicio == "" ||
        termino == null || termino == "" || minutos == null || minutos == "" ||
        prioridade == null || prioridade == ""
    ) {
        ErrorPopUp("Preencha todos os campos corretamente")
    } else {
        if (assistencia == true) {
            if (assistencia1 == "") {
                assistencia1 = "Nulo"
            }
            if (assistencia2 == "") {
                assistencia2 = "Nulo"
            }
            if (assistencia3 == "") {
                assistencia3 = "Nulo"
            }
            if (assistencia4 == "") {
                assistencia4 = "Nulo"
            }
                const colaborador = JSON.parse(localStorage.getItem("LoggedIn"))
                const id = colaborador.Id
                Adicionar_Tarefa(ocorrencia, descricao, inicio, termino, classificacao,
                    minutos, setor, equipamento, id, false, "", prioridade, assistencia1, assistencia2,
                    assistencia3, assistencia4)
            } else {
                const colaborador = JSON.parse(localStorage.getItem("LoggedIn"))
                    const id = colaborador.Id
                    Adicionar_Tarefa(ocorrencia, descricao, inicio, termino, classificacao,
                        minutos, setor, equipamento, id, false, "", prioridade, "Nulo", "Nulo", "Nulo", "Nulo")
            }
    }
})
function ErrorPopUp(mensagem) {
    document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>${mensagem}</strong>
                </h1>
                <button class="BotaoPadrao2" id="FecharPopUp">Voltar</button>    
            </div>
        </div>
        `
    document.getElementById("FecharPopUp").addEventListener("click", FecharPopUp)
}