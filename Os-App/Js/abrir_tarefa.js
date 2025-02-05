import { adminURL } from "./constants.js";
import { Abrir_Tarefa } from "./tarefa.js";
import { get_colaboradores } from "./colaborador.js";
import { get_setor } from "./setor.js";
import { get_equipamento } from "./equipamento.js";
Verificar_Login()
function Verificar_Login() {
    const user = JSON.parse(localStorage.getItem("LoggedIn"))
    if (user != null && user != "") {
        if ("admin" in user) {
            return true
        } else if (user.Funcao == "Qualidade") {
            return true
        } else {
            window.location.href = "../index.html"
        }
    } else {
        window.location.href = "../index.html"
    }
}
document.getElementById("BackPage").addEventListener("click", () => {
    window.history.back()
})
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
document.getElementById("AbrirTarefa").addEventListener('click', () => {
    const ocorrencia = document.getElementById("Tarefa_ocorrencia").value
    const classificacao = document.getElementById("Tarefa_classificacao").value
    const setor = document.getElementById("Tarefa_setor").value
    const equipamento = document.getElementById("Tarefa_equipamento").value
    const inicio = document.getElementById("Tarefa_inicio").value
    const termino = document.getElementById("Tarefa_termino").value
    const prioridade = document.getElementById("Tarefa_prioridade").value
    const descricao = document.getElementById("Tarefa_descricao").value
    if (ocorrencia == null || ocorrencia == "" ||
        classificacao == null || classificacao == "" || setor == null || setor == "" ||
        equipamento == null || equipamento == "" || inicio == null || inicio == "" ||
        termino == null || termino == "" ||
        prioridade == null || prioridade == ""
    ) {
        document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Preencha todos os campos</strong>
                </h1>
                <button class="BotaoPadrao2" id="FecharPopUp">Voltar</button>    
            </div>
        </div>
        `
        document.getElementById("FecharPopUp").addEventListener("click", FecharPopUp)
    } else {
        Abrir_Tarefa(ocorrencia, descricao, inicio, termino, classificacao,
            0, setor, equipamento, prioridade)
    }
})