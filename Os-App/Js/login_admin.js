import { login_admin } from "./admin.js";
document.getElementById("botao_login").addEventListener("click", () => {
    TentarLogin()
})
async function TentarLogin(){
    let login = document.getElementById("admin_login").value
    let senha = document.getElementById("admin_senha").value
    const verificacao = await login_admin(login, senha)
    if(verificacao == false){
        document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Usuário ou senha incorretos</strong>
                </h1>
                <button class="BotaoPadrao2" id="FecharPopUp" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
        `
    }
}