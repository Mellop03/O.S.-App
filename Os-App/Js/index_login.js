import { login_colaborador } from './colaborador.js';
import { Verificar_Login } from './constants.js';
const verify = JSON.parse(localStorage.getItem("LoggedIn"))
if (verify == null || verify == undefined || verify == "") {
} else {
    Verificar_Login(verify)
}
async function fazer_login_colaborador() {
    let nome_usuario = document.getElementById("Usuario_login").value
    let senha_usuario = document.getElementById("Usuario_senha").value
    let botaoFechar = null
    if (nome_usuario == "" || nome_usuario == null || senha_usuario == "" || senha_usuario == null) {
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
        botaoFechar = document.getElementById("FecharPopUp")
        botaoFechar.addEventListener("click", FecharPopUp)
    } else {
        const result = await login_colaborador(nome_usuario, senha_usuario)
        if (result == "Colaborador") {
            window.location.href = "../Html/Colaborador/home_colaborador.html"
        } else if(result == "Qualidade"){
            window.location.href = "../Html/Qualidade/home_qualidade.html"
        } else {
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
}
export function FecharPopUp() {
    window.location.reload()
    document.getElementById("PopUpTotal").remove()
}
const botaoLogin = document.getElementById("BotaoLogin")
botaoLogin.addEventListener('click', fazer_login_colaborador)