import { verificar_admin } from "./admin.js";
import {get_admin} from "./admin.js";
verificar_admin()
const administradores = await get_admin()
for (let i = 0; i < administradores.length; i++){
    document.getElementById("load_admin").innerHTML += `
    <div class="ConteudoDiv">
        <h1 class="H1Conteudo">${administradores[i].NOME_ADMIN}</h1>
        <p>Login do administrador: ${administradores[i].LOGIN_ADMIN}</p>
        <a class="BotaoPadrao4" onclick="popUp2(${administradores[i].ID_ADMIN})" id="editar_admin">Editar</a>
    </div>
    `
}