import { novo_equipamento } from "./equipamento.js"
import { verificar_admin } from "./admin.js";
verificar_admin()
document.getElementById("Adicionar_equipamento").addEventListener("click", () => {
    const nome = document.getElementById("Equipamento_nome").value
    const identificacao = document.getElementById("Equipamento_identificacao").value
    if (nome == "" || nome == null || identificacao == null || identificacao == "") {
        document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Erro ao adicionar equipamento:</strong> preencha todos os campos corretamente
                </h1>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
        `
    } else {
        novo_equipamento(nome, identificacao)
    }
})