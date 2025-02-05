import { log_out } from "./constants.js";
import { verificar_admin } from "./admin.js";
const user = verificar_admin()
document.getElementById("UserName").innerHTML = `Bem vindo(a) ${user.Nome}`
document.getElementById("fazer_logOut").addEventListener('click', log_out)
document.getElementById("config_colaboradores").addEventListener("click", () => {
    window.location.href = "colaboradores_admin.html"
})
document.getElementById("config_admin").addEventListener("click", () => {
    window.location.href = "administradores.html"
})
document.getElementById("config_setor").addEventListener('click', () => {
    window.location.href = "setores_admin.html"
})
document.getElementById("config_equipamento").addEventListener('click', () => {
    window.location.href = "equipamentos_admin.html"
})
document.getElementById("abrir_os").addEventListener("click", () => {
    window.location.href = "abrir_tarefas.html"
})
document.getElementById("lista_tarefa").addEventListener('click', () => {
    document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv">
                <h1 class="TextoH1">
                    É recomendável uso de computador!
                </h1>
                <p>
                    Se você estiver usando a versão mobile do aplicativo poderá experienciar problemas devido ao tamanho da tela
                </p>
                <br>
                <br>
                <br>
                <button class="BotaoPadrao2" id="tarefas_redirect">Entrar mesmo assim</button>
                <button class="BotaoPadrao2" id="back">Voltar</button>
            </div>
        </div>`
    document.getElementById("tarefas_redirect").addEventListener("click", () => {
        window.location.href = "tarefas_admin.html"
    })
    document.getElementById("back").addEventListener("click", () => {
        window.location.reload()
    })
})