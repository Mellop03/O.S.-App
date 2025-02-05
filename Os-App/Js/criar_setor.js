import {novoSetor} from "./setor.js"
import { verificar_admin } from "./admin.js"
verificar_admin()
document.getElementById("Adicionar_setor").addEventListener("click", () => {
    const nome = document.getElementById("Setor_nome").value
    const identificacao = document.getElementById("Setor_identificacao").value
    if(nome == "" || nome == null || identificacao == "" || identificacao == null){
        document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Erro ao adicionar setor:</strong> preencha todos os campos corretamente
                </h1>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
        `
    }else {
        novoSetor(nome, identificacao)
    }
})