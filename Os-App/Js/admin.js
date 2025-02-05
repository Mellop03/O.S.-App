import { adminURL } from "./constants.js"
export async function login_admin(login, senha) {
  const request = await fetch(adminURL + "/login", {
    method: 'POST',
    body: JSON.stringify({
      "LOGIN_ADMIN": login,
      "SENHA_ADMIN": senha
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (request.status == 200) {
    const info = await request.json()
    localStorage.setItem('LoggedIn', JSON.stringify(info))
    window.location.href = "./home_admin.html"
  } else {
    return false
  }
}
export function verificar_admin() {
  const logged = JSON.parse(localStorage.getItem("LoggedIn"))
  if (logged != null && logged != ""){
    if ("admin" in logged){
      return logged
    } else {
      window.history.back()
    }
  } else {
    window.location.href = "../index.html"
  }
}
export async function get_admin(){
  const request = await fetch(adminURL + "/listar")
  const data = await request.json()
  return data
}
export async function novoadmin(Nome, Login, Senha){
  const request = await fetch(adminURL + `/novoadmin`, {
    method: 'POST',
    body: JSON.stringify({
      "NOME_ADMIN": Nome,
      "LOGIN_ADMIN": Login,
      "SENHA_ADMIN": Senha
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if(request.status == 200){
    window.location.href = "./administradores.html"
  } else {
    document.getElementById("Bode").innerHTML += `
            <div id="PopUpTotal" class="PopUpTotal">
                <div class="PopUpDiv" id="PopUpDiv">
                    <h1 class="TextoH1 transparenciaFalse">
                        <strong>Erro ao adicionar administrador:</strong> login já existente
                    </h1>
                    <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
                </div>
            </div>
            `
  }
}