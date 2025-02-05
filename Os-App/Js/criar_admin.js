import { adminURL } from "./constants.js"
import { novoadmin, verificar_admin } from "./admin.js"
verificar_admin()
document.getElementById("Adicionar_admin").addEventListener("click", () => {
    const Nome = document.getElementById("Admin_nome").value
    const Login = document.getElementById("Admin_login").value
    const Senha = document.getElementById("Admin_senha").value
    if (Nome == null || Nome == "" || Login == null || Login == "" || Senha == null || Senha == ""){
        document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Erro ao adicionar administrador:</strong> preencha todos os campos
                </h1>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
        `
    } else {
        novoadmin(Nome, Login, Senha)
    }
})