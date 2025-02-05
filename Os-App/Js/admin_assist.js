function popUp(id) {
    get_colaborador(id)
}
function popUp2(id) {
    get_admin(id)
}
function popUp3(id) {
    get_setor(id)
}
function popUp4(id) {
    get_equipamento(id)
}
async function get_colaborador(id) {
    const request = await fetch(`http://192.168.69.187:5000/colaborador/listar/${id}`)
    const data = await request.json()
    form(data)
}
async function get_admin(id) {
    const request = await fetch(`http://192.168.69.187:5000/admin/listar/${id}`)
    const data = await request.json()
    const idAdmin = JSON.parse(localStorage.getItem('LoggedIn'))
    if (idAdmin.Id == id) {
        form2(data)
    } else {
        recusaPermissao()
    }
}
async function get_setor(id) {
    const request = await fetch(`http://192.168.69.187:5000/setor/listar/${id}`)
    const data = await request.json()
    form3(data)
}
async function get_equipamento(id) {
    const request = await fetch(`http://192.168.69.187:5000/equipamento/listar/${id}`)
    const data = await request.json()
    form4(data)
}
function form(data) {
    document.getElementById("Bode").innerHTML += `
    <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1">
                    Editar colaborador: ${data[0].NOME_COLABORADOR}
                </h1>
                <p class="PTarefa">
                    Digite o nome do colaborador:
                    <input placeholder="Digite o nome do colaborador" type="text" id="Colaborador_nome" value="${data[0].NOME_COLABORADOR}" class="form-control" />
                </p>
                <input placeholder="Digite a identificação do colaborador" type="text" id="Colaborador_senha" value="${data[0].SENHA_COLABORADOR}" class="Nao"/>
                <p class="PTarefa">
                    Digite a identificação do colaborador:
                    <input placeholder="Digite a identificação do colaborador" type="text" id="Colaborador_identificacao" value="${data[0].IDENTIFICACAO_COLABORADOR}" class="form-control"/>
                </p>
                <p class="PTarefa">
                    Digite o login do colaborador:
                    <input placeholder="Digite o login do colaborador" type="text" id="Colaborador_login" value="${data[0].LOGIN_COLABORADOR}" class="form-control"/>
                </p>
                <p class="PTarefa">
                    Escolha a classificação:
                    <select id="Colaborador_classificacao"  class="form-control">
                        <option value="${data[0].FUNCAO_COLABORADOR}">${data[0].FUNCAO_COLABORADOR} (já atribuída)</option>
                        <option value="Qualidade">Qualidade</option>
                        <option value="Colaborador">Colaborador</option>
                    </select>
                </p>
                <br>
                <button class="BotaoPadrao2" onclick="EditarColaborador(${data[0].ID_COLABORADOR})">Atualizar colaborador</button>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
            </div>
        </div>
    `
}
function form2(data) {
    document.getElementById("Bode").innerHTML += `
    <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1">
                    Editar administrador: ${data[0].NOME_ADMIN}
                </h1>
                <p class="PTarefa">
                    Digite o nome do administrador:
                    <input placeholder="Digite o nome do adminstrador" type="text" id="Administrador_nome" value="${data[0].NOME_ADMIN}" class="form-control" />
                </p>
                <p class="PTarefa">
                    Digite o login do administrador:
                    <input placeholder="Digite o login do administrador" type="text" id="Administrador_login" value="${data[0].LOGIN_ADMIN}" class="form-control"/>
                </p>
                <br>
                <button class="BotaoPadrao2" onclick="EditarAdministrador(${data[0].ID_ADMIN})">Atualizar colaborador</button>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
            </div>
        </div>
    `
}
function form3(data) {
    document.getElementById("Bode").innerHTML += `
    <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1">
                    Editar setor: ${data[0].NOME_SETOR}
                </h1>
                <p class="PTarefa">
                    Digite o nome do setor:
                    <input placeholder="Digite o nome do setor" type="text" id="Setor_nome" value="${data[0].NOME_SETOR}" class="form-control" />
                </p>
                <p class="PTarefa">
                    Digite a identificação do setor:
                    <input placeholder="Digite a identificação do setor" type="text" id="Setor_identificacao" value="${data[0].IDENTIFICACAO_SETOR}" class="form-control"/>
                </p>
                <br>
                <button class="BotaoPadrao2" onclick="EditarSetor(${data[0].ID_SETOR})">Atualizar setor</button>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
            </div>
        </div>
    `
}
function form4(data) {
    document.getElementById("Bode").innerHTML += `
    <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1">
                    Editar equipamento: ${data[0].NOME_EQUIPAMENTO}
                </h1>
                <p class="PTarefa">
                    Digite o nome do equipamento:
                    <input placeholder="Digite o nome do eqpamento" type="text" id="Equipamento_nome" value="${data[0].NOME_EQUIPAMENTO}" class="form-control" />
                </p>
                <p class="PTarefa">
                    Digite a identificação do equipamento:
                    <input placeholder="Digite a identificação do equipamento" type="text" id="Equipamento_identificacao" value="${data[0].IDENTIFICACAO_EQUIPAMENTO}" class="form-control"/>
                </p>
                <br>
                <button class="BotaoPadrao2" onclick="EditarEquipamento(${data[0].ID_EQUIPAMENTO})">Atualizar equipamento</button>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
            </div>
        </div>
    `
}
function FecharPopUp() {
    window.location.reload()
    document.getElementById("PopUpTotal").remove()
}
function recusaPermissao() {
    document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Erro ao acessar o administrador</strong>
                </h1>
                <p>Administradores não podem editar outro administrador</p>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
        `
}
async function EditarColaborador(id) {
    const Nome = document.getElementById("Colaborador_nome").value
    const Identificacao = document.getElementById("Colaborador_identificacao").value
    const Login = document.getElementById("Colaborador_login").value
    const Funcao = document.getElementById("Colaborador_classificacao").value
    if (Nome == "" || Nome == null || Identificacao == null || Identificacao == "" || Login == null || Login == "" || Funcao == null || Funcao == "") {
        document.getElementById("PopUpDiv").innerHTML = `
        <h1 class="TextoH1 transparenciaFalse">
            <strong>Erro ao editar colaborador:</strong> não deixe nenhum campo em branco
        </h1>
        <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
        `
    } else {
        const request = await fetch(`http://192.168.69.187:5000/colaborador/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                "LOGIN_COLABORADOR": Login,
                "NOME_COLABORADOR": Nome,
                "IDENTIFICACAO_COLABORADOR": Identificacao,
                "FUNCAO_COLABORADOR": Funcao
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        document.getElementById("PopUpDiv").innerHTML = `
        <h1 class="TextoH1 transparenciaFalse">
            <strong>Colaborador atualizado com sucesso</strong>
        </h1>
        <p>Atualize a página ao sair</p>
        <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
        `
    }
}
async function excluir(id) {
    document.getElementById("Bode").innerHTML = `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1">
                    Tem certeza que deseja excluir esse colaborador?
                </h1>
                <br>
                <button class="BotaoPadrao2" onclick="DeletarColaborador(${id})">Sim</button>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
            </div>
        </div>
    `
}
async function DeletarColaborador(id) {
    request = await fetch(`http://192.168.69.187:5000/colaborador/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })
    if (request.status == 200) {
        document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Colaborador excluído com sucesso!</strong>
                </h1>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
        `
    }
}
function VoltarHome() {
    window.location.href = "../Admin/home_admin.html"
}
function VoltarColaborador() {
    window.location.href = "../Admin/colaboradores_admin.html"
}
async function EditarAdministrador(id) {
    const Nome = document.getElementById("Administrador_nome").value
    const Login = document.getElementById("Administrador_login").value
    if (Login == "" || Login == null || Nome == "" || Nome == null) {
        document.getElementById("PopUpDiv").innerHTML = `
        <h1 class="TextoH1 transparenciaFalse">
            <strong>Erro ao editar administrador:</strong> não deixe nenhum campo em branco
        </h1>
        <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
        `
    } else {
        const request = await fetch(`http://192.168.69.187:5000/admin/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                "LOGIN_ADMIN": Login,
                "NOME_ADMIN": Nome
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        if (request.status == 200) {
            document.getElementById("PopUpDiv").innerHTML = `
        <h1 class="TextoH1 transparenciaFalse">
            <strong>Administrador atualizado com sucesso</strong>
        </h1>
        <p>Atualize a página ao sair</p>
        <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
        `
        } else {
            document.getElementById("PopUpDiv").innerHTML = `
        <h1 class="TextoH1 transparenciaFalse">
            <strong>Erro ao atualizar administrador</strong>
        </h1>
        <p></p>
        <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
        `
        }
    }
}
async function EditarSetor(id) {
    const Nome = document.getElementById("Setor_nome").value
    const identificacao = document.getElementById("Setor_identificacao").value
    if (identificacao == "" || identificacao == null || Nome == "" || Nome == null) {
        document.getElementById("PopUpDiv").innerHTML = `
        <h1 class="TextoH1 transparenciaFalse">
            <strong>Erro ao editar setor:</strong> não deixe nenhum campo em branco
        </h1>
        <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
        `
    } else {
        const request = await fetch(`http://192.168.69.187:5000/setor/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                "IDENTIFICACAO_SETOR": identificacao,
                "NOME_SETOR": Nome
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        if (request.status == 200) {
            document.getElementById("PopUpDiv").innerHTML = `
        <h1 class="TextoH1 transparenciaFalse">
            <strong>Setor atualizado com sucesso</strong>
        </h1>
        <p>Atualize a página ao sair</p>
        <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
        `
        } else {
            document.getElementById("PopUpDiv").innerHTML = `
        <h1 class="TextoH1 transparenciaFalse">
            <strong>Erro ao atualizar setor</strong>
        </h1>
        <p>400</p>
        <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
        `
        }
    }
}
async function EditarEquipamento(id) {
    const nome = document.getElementById("Equipamento_nome").value
    const identificacao = document.getElementById("Equipamento_identificacao").value
    if (nome == "" || nome == null || identificacao == null || identificacao == "") {
        document.getElementById("PopUpDiv").innerHTML = `
        <h1 class="TextoH1 transparenciaFalse">
            <strong>Erro ao editar equipamento:</strong> não deixe nenhum campo em branco
        </h1>
        <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
        `
    } else {
        const request = await fetch(`http://192.168.69.187:5000/equipamento/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                "NOME_EQUIPAMENTO": nome,
                "IDENTIFICACAO_EQUIPAMENTO": identificacao
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (request.status == 200) {
            document.getElementById("PopUpDiv").innerHTML = `
        <h1 class="TextoH1 transparenciaFalse">
            <strong>Equipamento atualizado com sucesso</strong>
        </h1>
        <p>Atualize a página ao sair</p>
        <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
        `
        } else {
            document.getElementById("PopUpDiv").innerHTML = `
        <h1 class="TextoH1 transparenciaFalse">
            <strong>Erro ao atualizar equipamento</strong>
        </h1>
        <p>400</p>
        <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
        `
        }
    }
}
async function deletarSetor(id) {
    document.getElementById("Bode").innerHTML += `
    <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1">
                    Tem certeza que deseja excluir esse setor?
                </h1>
                <br>
                <button class="BotaoPadrao2" onclick="DeletarSetor(${id})">Sim</button>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
            </div>
        </div>
    `
}
async function DeletarSetor(id){
    const request = await fetch(`http://192.168.69.187:5000/setor/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })
    if (request.status == 200) {
        document.getElementById("Bode").innerHTML = `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Setor excluído com sucesso!</strong>
                </h1>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
        `
    } else {
        document.getElementById("Bode").innerHTML = `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Erro ao excluir setor</strong>
                </h1>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
        `
    }
}
async function deletarEquipamento(id){
    document.getElementById("Bode").innerHTML += `
    <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1">
                    Tem certeza que deseja excluir esse equipamento?
                </h1>
                <br>
                <button class="BotaoPadrao2" onclick="DeletarEquipamento(${id})">Sim</button>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
            </div>
        </div>
    `
}
async function DeletarEquipamento(id){
    const request = await fetch(`http://192.168.69.187:5000/equipamento/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (request.status == 200) {
        document.getElementById("Bode").innerHTML = `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Equipamento excluído com sucesso!</strong>
                </h1>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
        `
    } else {
        document.getElementById("Bode").innerHTML = `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Erro ao excluir equipamento</strong>
                </h1>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
        `
    }
}