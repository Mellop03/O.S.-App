import { log_out } from "./constants.js";
import { verificar_Login } from "./colaborador.js";
const user = verificar_Login()
document.getElementById("UserName").innerHTML = `Bem vindo(a) ${user.Nome}`
document.getElementById("fazer_logOut").addEventListener("click", log_out)
document.getElementById("enviar_os").addEventListener("click", () => {
    window.location.href = "./colaborador_tarefa.html"
})
document.getElementById("open_os").addEventListener("click", () => {
    window.location.href = "./tarefa_aberta.html"
})