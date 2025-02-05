async function get_colaboradores() {
    const request = await fetch("http://192.168.69.187:5000/colaborador/listar")
    const info = await request.json()
    return info
}
async function ConcluirTarefa(id) {
    const tarefa = id
    let colaboradores = await get_colaboradores()
    const colaborador = JSON.parse(localStorage.getItem("LoggedIn"))
    document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Tem certeza que quer marcar essa tarefa como concluída?</strong>
                </h1>
                <p class="PTarefa">
                    Digite o tempo levado (em minutos):
                    <input class="form-control" type="number" id="minutosTarefa" placeholder="Tempo de execução da tarefa" />
                </p>
                <p class="PTarefa">
                    Digite a descrição da tarefa:
                    <textarea class="form-control" type="text" id="descricaoTarefa" placeholder="Descrição da tarefa"></textarea>
                </p>
                <p class="PTarefa">
                    Você teve assistência de alguém?
                    <input style="transform: scale(1.4);" type="checkbox" name="Tarefa_toggle" id="Tarefa_toggle">
                    <select class="form-control" style="display: none;" id="Tarefa_assistencia">
                        <option value="">Escolha um colaborador</option>
                    </select>
                    <br>
                    <select class="form-control" style="display: none;" id="Tarefa_assistencia2">
                        <option value="">Escolha um segundo colaborador (opcional)</option>
                    </select>
                    <br>
                    <select class="form-control" style="display: none;" id="Tarefa_assistencia3">
                        <option value="">Escolha um terceiro colaborador (opcional)</option>
                    </select>
                    <br>
                    <select class="form-control" style="display: none;" id="Tarefa_assistencia4">
                        <option value="">Escolha um quarto colaborador (opcional)</option>
                    </select>
                </p>
                <p>Colaborador: ${colaborador.Nome}</p>
                <button class="BotaoPadrao2" onclick="ConcluirTarefaS(${colaborador.Id}, ${tarefa})">Concluir</button>    
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
        `
    const verifyToggle = document.getElementById("Tarefa_toggle")
    verifyToggle.addEventListener("click", () => {
        if (verifyToggle.checked == true) {
            document.getElementById("Tarefa_assistencia").style.display = "block"
            document.getElementById("Tarefa_assistencia2").style.display = "block"
            document.getElementById("Tarefa_assistencia3").style.display = "block"
            document.getElementById("Tarefa_assistencia4").style.display = "block"
        } else {
            document.getElementById("Tarefa_assistencia").style.display = "none"
            document.getElementById("Tarefa_assistencia2").style.display = "none"
            document.getElementById("Tarefa_assistencia3").style.display = "none"
            document.getElementById("Tarefa_assistencia4").style.display = "none"
        }
    })
    const textarea = document.getElementById('descricaoTarefa');
    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
    });
    for (let i = 0; i < colaboradores.length; i++) {
        if (colaboradores[i].FUNCAO_COLABORADOR == "Colaborador" && colaboradores[i].ID_COLABORADOR != colaborador.Id) {
            document.getElementById("Tarefa_assistencia").innerHTML += `
            <option value="${colaboradores[i].ID_COLABORADOR}">${colaboradores[i].NOME_COLABORADOR}</option>
            `
            document.getElementById("Tarefa_assistencia2").innerHTML += `
            <option value="${colaboradores[i].ID_COLABORADOR}">${colaboradores[i].NOME_COLABORADOR}</option>
            `
            document.getElementById("Tarefa_assistencia3").innerHTML += `
            <option value="${colaboradores[i].ID_COLABORADOR}">${colaboradores[i].NOME_COLABORADOR}</option>
            `
            document.getElementById("Tarefa_assistencia4").innerHTML += `
            <option value="${colaboradores[i].ID_COLABORADOR}">${colaboradores[i].NOME_COLABORADOR}</option>
            `
        }
    }
}
function FecharPopUp() {
    window.location.reload()
    document.getElementById("PopUpTotal").remove()
}
async function ConcluirTarefaS(colaborador, tarefa) {
    const minutos = document.getElementById("minutosTarefa").value
    const descricao = document.getElementById("descricaoTarefa").value
    let assist1 = document.getElementById("Tarefa_assistencia").value
    let assist2 = document.getElementById("Tarefa_assistencia2").value
    let assist3 = document.getElementById("Tarefa_assistencia3").value
    let assist4 = document.getElementById("Tarefa_assistencia4").value
    if (assist1 == "" || assist1 == null) {
        assist1 = "Nulo"
    }
    if (assist2 == "" || assist2 == null) {
        assist2 = "Nulo"
    }
    if (assist3 == "" || assist3 == null) {
        assist3 = "Nulo"
    }
    if (assist4 == "" || assist4 == null) {
        assist4 = "Nulo"
    }
    let d1 = new Date()
    let d2 = new Date()
    let d3 = new Date()
    let dia = String(d1.getDate()).padStart(2, '0')
    let mes = String(d2.getMonth() + 1).padStart(2, '0')
    const ano = d3.getFullYear()
    const dataC = `${dia}/${mes}/${ano}`
    const request = await fetch(`http://192.168.69.187:5000/tarefa/concluir/${tarefa}`, {
        method: "PUT",
        body: JSON.stringify({
            DESCRICAO_TAREFA: descricao,
            TERMINO_TAREFA: dataC,
            ID_COLABORADOR: colaborador,
            MINUTOS_TAREFA: minutos,
            ASSIST1: assist1,
            ASSIST2: assist2,
            ASSIST3: assist3,
            ASSIST4: assist4
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (request.status == 200) {
        document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>O.S. concluída com sucesso!</strong>
                </h1>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
        `
    } else {
        document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Não foi possível concluir a O.S.</strong>
                </h1>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
        `
    }
} 