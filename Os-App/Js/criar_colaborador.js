import { verificar_admin } from "./admin.js";
import { criar_colaborador } from "./colaborador.js";
verificar_admin()
document.getElementById("AdicionarColaborador").addEventListener("click", () => {
    const nome = document.getElementById("Colaborador_nome").value
    const login = document.getElementById("Colaborador_login").value
    const identificacao = document.getElementById("Colaborador_identificacao").value
    const senha = document.getElementById("Colaborador_senha").value
    const funcao = document.getElementById("Colaborador_funcao").value
    if (nome == null || nome == "" || login == null || login == "" || identificacao == null || identificacao == "" || senha == null || senha == "" || funcao == "" || funcao == null) {
        document.getElementById("Bode").innerHTML += `
    <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Erro ao adicionar colaborador:</strong> não deixe nenhum campo em branco
                </h1>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
    `
    } else {
        if (criar_colaborador(nome, login, identificacao, senha, funcao)) {
            document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Colaborador adicionado com sucesso!</strong>
                </h1>
                <button class="BotaoPadrao2" onclick="VoltarColaborador()">Voltar</button>    
            </div>
        </div>
        `
        } else {
            document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Não foi possível adicionar o colaborador</strong>
                </h1>
                <button class="BotaoPadrao2" onclick="VoltarColaborador()">Voltar</button>    
            </div>
        </div>
        `
        }
    }
})