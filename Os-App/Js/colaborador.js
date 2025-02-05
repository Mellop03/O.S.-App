import { colaboradorURL } from "./constants.js"
export async function login_colaborador(login, senha) {
  const request = await fetch(colaboradorURL + "/login", {
    method: 'POST',
    body: JSON.stringify({
      "LOGIN_COLABORADOR": login,
      "SENHA_COLABORADOR": senha
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (request.status == 200) {
    const info = await request.json()
    localStorage.setItem('LoggedIn', JSON.stringify(info))
    if (info.Funcao == "Colaborador") {
      return "Colaborador"
    } else if (info.Funcao == "Qualidade") {
      window.location.href = "../Html/Qualidade/home_qualidade.html"
      return "Qualidade"
    }
  } else {
    document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Usuário ou senha inválidos</strong>
                </h1>
                <button class="BotaoPadrao2" id="FecharPopUp">Voltar</button>    
            </div>
        </div>
        `
    document.getElementById("FecharPopUp").addEventListener("click", FecharPopUp)
  }
}
export function FecharPopUp() {
  window.location.reload()
  document.getElementById("PopUpTotal").remove()
}
export async function get_colaboradores() {
  const request = await fetch(colaboradorURL + "/listar")
  const info = await request.json()
  return info
}
export async function criar_colaborador(nome, login, identificacao, senha, funcao) {
  const request = await fetch(colaboradorURL + "/novocolaborador", {
    method: "POST",
    body: JSON.stringify({
      "NOME_COLABORADOR": nome,
      "LOGIN_COLABORADOR": login,
      "IDENTIFICACAO_COLABORADOR": identificacao,
      "SENHA_COLABORADOR": senha,
      "FUNCAO_COLABORADOR": funcao
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  if (request.status == 200) {
    return true
  } else if (request.status == 400){
    document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Já existe um colaborador com o mesmo login!</strong>
                </h1>
                <button class="BotaoPadrao2" onclick="VoltarColaborador()">Voltar</button>    
            </div>
        </div>
        `
  }
}
export function verificar_Login() {
  const verify = JSON.parse(localStorage.getItem("LoggedIn"))
  if (verify){
    if ("Funcao" in verify){
      if(verify.Funcao == "" || verify.Funcao == null){
        window.location.href = "../index.html"
      } else if (verify.Funcao == "Colaborador"){
        return verify
      } else {
        window.location.href = "../index.html"
      }
    } else {
      window.location.href = "../index.html"
    }
  } else {
    window.location.href = "../index.html"
  }
}
export function verificar_Login_qualidade() {
  const verify = JSON.parse(localStorage.getItem("LoggedIn"))
  if (verify){
    if ("Funcao" in verify){
      if(verify.Funcao == "" || verify.Funcao == null){
        window.location.href = "../index.html"
      } else if (verify.Funcao == "Qualidade"){
        return verify
      } else {
        window.location.href = "../index.html"
      }
    } else {
      window.location.href = "../index.html"
    }
  } else {
    window.location.href = "../index.html"
  }
}
export async function get_colaborador_filtro(){
  const request = await fetch(colaboradorURL + "/listarcolaboradorfiltro")
  if(request.status == 200){
    const colaborador = await request.json()
    return colaborador
  } else {
    return false
  }
}