import { verificar_Login_qualidade, FecharPopUp } from "./colaborador.js";
import { log_out } from "./constants.js";
const user = verificar_Login_qualidade()
document.getElementById("UserName").innerHTML = `Bem vindo(a) ${user.Nome}`
document.getElementById("verificar_os").addEventListener("click", () => {
    window.location.href = "tarefa_qualidade.html"
})
document.getElementById("abrir_os").addEventListener("click", () => {
    window.location.href = "../Admin/abrir_tarefas.html"
})
document.getElementById("fazer_logOut").addEventListener("click", () => {
    log_out()
})