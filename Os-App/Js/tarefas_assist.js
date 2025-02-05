function FecharPopUp() {
    window.location.reload()
    document.getElementById("PopUpTotal").remove()
}
async function get_equipamentos() {
    const request = await fetch("http://192.168.69.187:5000/equipamento/listaridnome")
    if (request.status == 200) {
        const data = await request.json()
        return data
    }
}
async function get_colaboradores() {
    const request = await fetch("http://192.168.69.187:5000/colaborador/listaridnome")
    const info = await request.json()
    return info
}
async function get_setores() {
    const request = await fetch("http://192.168.69.187:5000/setor/listaridnome")
    if (request.status == 200) {
        const data = await request.json()
        return data
    }
}
let tarefa = ""
async function DetalhesTarefa(id) {
    const request = await fetch(`http://192.168.69.187:5000/tarefa/listarcompleto/${id}`)
    if (request.status == 200) {
        const data = await request.json()
        tarefa = data
        let prioridade = ""
        let VistoQualidade = ""
        let IdEquipamento = tarefa.ID_EQUIPAMENTO
        let NomeEquipamento = tarefa.NOME_EQUIPAMENTO
        let IdSetor = tarefa.ID_SETOR
        let NomeSetor = tarefa.NOME_SETOR
        let IdColaborador = tarefa.ID_COLABORADOR
        let NomeColaborador = tarefa.NOME_COLABORADOR
        let Open = tarefa.FINALIZADA_TAREFA
        let assist = tarefa.ASSISTANT_COLABORADORES
        let splitted = assist.split(" e ")
        if (assist != "" && assist != null) {
            if (splitted.length == 3){
                assist = `, ${splitted[0]}, ${splitted[1]} e ${splitted[2]}`
            } else if (splitted.length == 4){
                assist = `, ${splitted[0]}, ${splitted[1]}, ${splitted[2]} e ${splitted[3]}`
            } else {
                assist = `, ${assist}`
            }
        } else if (assist == null) {
            assist = ""
        }
        if (tarefa.VISTO_QUALIDADE == true) {
            VistoQualidade = "Sim"
        } else {
            VistoQualidade = "Não"
        }
        if (Open == true) {
            Open = "Tarefa finalizada"
        } else {
            Open = "Tarefa em andamento"
        }
        if (data.PRIORIDADE_TAREFA == "A++") {
            prioridade = "A++ (limite de 1 dia)"
        } else if (data.PRIORIDADE_TAREFA == "A+") {
            prioridade = "A+ (limite de 1 semana)"
        } else if (data.PRIORIDADE_TAREFA == "A") {
            prioridade = "A (limite de 1 mês)"
        }
        if (IdEquipamento == null || IdEquipamento == "") {
            NomeEquipamento = "Equipamento excluído"
        }
        if (IdColaborador == "" || IdColaborador == null) {
            NomeColaborador = "N/A"
        }
        if (IdSetor == "" || IdSetor == null) {
            NomeSetor = "Setor excluído"
        }
        document.getElementById("PDF").innerHTML = `
        <div id="PopUpTotal" class="PopUpTotal2">
                <div class="PopUpDiv2" id="PopUpDiv">
                    <h1 class="TextoH12">
                        Detalhes da tarefa nº ${data.ID_TAREFA}
                    </h1>
                    <p class="menosMargin"><strong>Código:</strong> RPAC1 003</p>
                    <p class="menosMargin"><strong>Revisão:</strong> 005</p>
                    <p class="menosMargin"><strong>Data da revisão:</strong> 03/01/2025</p>
                    <p class="PTarefa2">
                        Ocorrência da tarefa: ${data.OCORRENCIA_TAREFA}
                    </p>
                    <p class="PTarefa2">
                        Descrição da tarefa: ${data.DESCRICAO_TAREFA}
                    </p>
                    <p class="PTarefa2">
                        Classificação: ${data.CLASSIFICACAO_TAREFA}
                    </p>
                    <p class="PTarefa2">
                        Prioridade: ${prioridade}
                    </p>
                    <p class="PTarefa2">
                        Setor em que foi efetuada a tarefa: ${NomeSetor}
                    </p>
                    <p class="PTarefa2">
                        Equipamento em que foi efetuada a tarefa: ${NomeEquipamento}
                    </p>
                    <p class="PTarefa2">
                        Colaboradores que executaram a tarefa: ${NomeColaborador}${assist}
                    </p>
                    <p class="PTarefa2">
                        Data de início da tarefa: ${data.DATA_TAREFA}
                    </p>
                    <p class="PTarefa2">
                        Data de término da tarefa: ${data.TERMINO_TAREFA}
                    </p>
                    <p class="PTarefa2">
                        Tempo decorrido (em minutos): ${data.MINUTOS_TAREFA}
                    </p>
                    <p class="PTarefa2">
                        ${Open}
                    </p>
                    <p class="PTarefa2">
                        Possui visto da qualidade? ${VistoQualidade}
                    </p>
                    <p class="PTarefa2">
                        Anotações da qualidade: ${data.TEXTO_QUALIDADE}
                    </p>
                    <p class="None" id="TextoDaQualidade">
                        COMO: Manutenção Preventiva: A partir do Plano de Manutenção Preventiva será
                        apontado na ordem de serviço os dados referentes a execução da manutenção preventiva.
                        Manutenção Corretiva: A partir de uma solicitação de reparo ou manutenção é aberta a ordem de 
                        serviço para execução da manutenção corretiva. Abertura pode ser solicitada através
                        de um Registro de Descrição  Não Conformidade (RGQ 006), através de e-mail, pelo aplicativo ou 
                        whatsapp. Preencher todos os campos corretamente. Liberação pela equipe de qualidade
                         quando houver a necessidade de higienização do equipamento ou qualquer outra 
                        situação que coloque em risco a segurança do produto, liberação pode ser visual
                         ou por análise laboratorial.
                    </p>
                    <button id="BotaoPDFNone" class="BotaoPadrao22" onclick="EditarTarefa()">Editar tarefa</button>
                    <button id="BotaoPDFNone" class="BotaoPadrao22" onclick="DeletarTarefa()">Deletar tarefa</button>
                    <button id="BotaoPDFNone" class="BotaoPadrao22" onclick="baixarPDF(${data.ID_TAREFA})">Baixar PDF</button>
                    <button id="BotaoPDFNone" class="BotaoPadrao22" onclick="Imprimir()">Imprimir</button>
                    <button id="BotaoPDFNone" class="BotaoPadrao22" onclick="FecharPopUp()">Voltar</button>
                </div>
            </div>
        `
    }
}
async function DeletarTarefa() {
    const id = tarefa.ID_TAREFA
    const request = await fetch(`http://192.168.69.187:5000/tarefa/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (request.status == 200) {
        document.getElementById("PDF").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Tarefa deletada com sucesso!</strong>
                </h1>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
        `
    } else {
        document.getElementById("PDF").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Não foi possível deletar a tarefa</strong>
                </h1>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
        `
    }
}
function Imprimir() {
    document.getElementById("TextoDaQualidade").style.display = "block"
    document.getElementById("PopUpDiv").style.width = "100%"
    document.getElementById("PopUpDiv").style.height = "100%"
    window.print();
    document.getElementById("PopUpDiv").style.width = "60%"
    document.getElementById("PopUpDiv").style.height = ""
    document.getElementById("TextoDaQualidade").style.display = "none"
}
async function EditarTarefa() {
    const data = tarefa
    let colaborador = tarefa.NOME_COLABORADOR || "N/A"
    let equipamento = tarefa.NOME_EQUIPAMENTO || "N/A"
    let setor = tarefa.NOME_SETOR || "N/A"
    let IDs = tarefa.ASSISTANT_COLABORADORES_ID || ""
    let assist = tarefa.ASSISTANT_COLABORADORES
    let assistant1 = "Sem assitência"
    let assistant2 = "Sem assitência"
    let assistant3 = "Sem assitência"
    let assistant4 = "Sem assitência"
    let splittedID = IDs.split("e") || ""
    let ASSIST1 = parseInt(splittedID[0]) || ""
    let ASSIST2 = parseInt(splittedID[1]) || ""
    let ASSIST3 = parseInt(splittedID[2]) || ""
    let ASSIST4 = parseInt(splittedID[3]) || ""
    if (!tarefa.ID_COLABORADOR) {
        colaborador = "N/A"
    }
    if (assist != "" && assist != null) {
        assist = assist.split(" e ")
        assistant1 = assist[0] || "Sem assistência"
        assistant2 = assist[1] || "Sem assistência"
        assistant3 = assist[2] || "Sem assistência"
        assistant4 = assist[3] || "Sem assistência"
    } else if (assist == null) {
        assist = ""
    }
    const setores = await get_setores()
    const colaboradores = await get_colaboradores()
    const equipamentos = await get_equipamentos()
    document.getElementById("PopUpDiv").remove()
    document.getElementById("PopUpTotal").innerHTML = `
    <div id="PopUpTotal" class="PopUpTotal3">
                <div class="PopUpDiv3" id="PopUpDiv">
                    <h1 class="TextoH12">
                        Detalhes da tarefa nº ${data.ID_TAREFA}
                    </h1>
                    <p class="PTarefa2">
                        Digite a ocorrência da tarefa:
                        <input placeholder="Digite a ocorrência da tarefa" type="text" id="Ocorrencia_tarefa" value="${data.OCORRENCIA_TAREFA}" class="form-control"/>
                    </p>
                    <p class="PTarefa2">
                        Digite a descrição da tarefa:
                        <textarea placeholder="Digite a descrição da tarefa" type="text" id="Descricao_tarefa"  class="form-control">${data.DESCRICAO_TAREFA}</textarea>
                    </p>
                    <p class="PTarefa2">
                        Escolha a classificação da tarefa:
                        <select id="Classificacao_tarefa" class="form-control">
                            <option value="${data.CLASSIFICACAO_TAREFA}">${data.CLASSIFICACAO_TAREFA} (atualmente atribuído)</option>
                            <option value="Preventiva">Preventiva</option>
                            <option value="Melhoria">Melhoria</option>
                            <option value="Corretiva">Corretiva</option>
                        </select>
                    </p>
                    <p class="PTarefa2">
                        Escolha a prioridade da tarefa:
                        <select id="Prioridade_tarefa" class="form-control">
                            <option value="${data.PRIORIDADE_TAREFA}">${data.PRIORIDADE_TAREFA} (atualmente atribuído)</option>
                            <option value="A">A (limite de 1 mês)</option>
                            <option value="A+">A+ (limite de 1 semana)</option>
                            <option value="A++">A++ (limite de 1 dia)</option>
                        </select>
                    </p>
                    <p class="PTarefa2">
                        Escolha o setor em que foi efetuada a tarefa: 
                        <select id="Setor_tarefa" class="form-control">
                            <option value="${data.ID_SETOR}">${setor} (atualmente atribuído)</option>
                        </select>
                    </p>
                    <p class="PTarefa2">
                        Escolha o equipamento em que foi efetuada a tarefa: 
                        <select id="Equipamento_tarefa" class="form-control">
                            <option value="${data.ID_EQUIPAMENTO}">${equipamento} (atualmente atribuído)</option>
                        </select>
                    </p>
                    <p class="PTarefa2">
                        Escolha o colaborador que efetuou a tarefa: 
                        <select id="Colaborador_tarefa" class="form-control">
                            <option value="${data.ID_COLABORADOR}">${colaborador} (atualmente atribuído)</option>
                        </select>
                    </p>
                    <p class="PTarefa2">
                        Escolha os colaboradores que deram assistência: 
                        <select id="Tarefa_assistencia1" class="form-control">
                            <option value="Original">${assistant1} (atualmente atribuído)</option>
                            <option value="Nulo">Sem assistência</option>
                        </select>
                        <br>
                        <select id="Tarefa_assistencia2" class="form-control">
                            <option value="Original">${assistant2} (atualmente atribuído)</option>
                            <option value="Nulo">Sem assistência</option>
                        </select>
                        <br>
                        <select id="Tarefa_assistencia3" class="form-control">
                            <option value="Original">${assistant3} (atualmente atribuído)</option>
                            <option value="Nulo">Sem assistência</option>
                        </select>
                        <br>
                        <select id="Tarefa_assistencia4" class="form-control">
                            <option value="Original">${assistant4} (atualmente atribuído)</option>
                            <option value="Nulo">Sem assistência</option>
                        </select>
                    </p>
                    <p class="PTarefa2">
                        Data de início da tarefa:
                        <input type="text" class="form-control" value="${data.DATA_TAREFA}" placeholder="Digite a data de início (dd/mm/aaaa)" id="Inicio_tarefa"/>
                    </p>
                    <p class="PTarefa2">
                        Data de término da tarefa: ${data.TERMINO_TAREFA}
                         <input type="text" class="form-control" value="${data.TERMINO_TAREFA}" placeholder="Digite a data de término (dd/mm/aaaa)" id="Termino_tarefa"/>
                    </p>
                    <p class="PTarefa2">
                        Tempo decorrido (em minutos):
                        <input type="number" class="form-control" value="${data.MINUTOS_TAREFA}" placeholder="Digite o tempo levado (em minutos)" id="Minutos_tarefa"/>
                    </p>
                    <p class="PTarefa2">
                        Anotações da qualidade: ${data.TEXTO_QUALIDADE}
                        <input type="text" class="form-control" value="${data.TEXTO_QUALIDADE}" placeholder="Digite as anotações da qualidade" id="Texto_qualidade"/>
                    </p>
                    <p class="PTarefa2">
                        Possui visto da qualidade:
                        <input type="checkbox" id="Visto_qualidade"/>
                    </p>
                    <br>
                    <button class="BotaoPadrao2" onclick="EditarTarefa2(${data.ID_TAREFA})">Editar tarefa</button>
                    <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
                </div>
            </div>
                    `
    const textarea = document.getElementById('Descricao_tarefa');
    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
    });
    document.getElementById("Visto_qualidade").checked = data.VISTO_QUALIDADE
    for (let i = 0; i < setores.length; i++) {
        let setor = setores[i]
        document.getElementById("Setor_tarefa").innerHTML += `
                        <option value="${setor.ID_SETOR}">${setor.NOME_SETOR}</option>
                        `
    }
    for (let i = 0; i < equipamentos.length; i++) {
        let equipamento = equipamentos[i]
        document.getElementById("Equipamento_tarefa").innerHTML += `
                        <option value="${equipamento.ID_EQUIPAMENTO}">${equipamento.NOME_EQUIPAMENTO}</option>
                        `
    }
    for (let i = 0; i < colaboradores.length; i++) {
        let colaborador = colaboradores[i]
        if (colaborador.FUNCAO_COLABORADOR == "Colaborador" && colaborador.ID_COLABORADOR != data.ID_COLABORADOR
            && colaborador.ID_COLABORADOR != ASSIST1 && colaborador.ID_COLABORADOR != ASSIST2 &&
            colaborador.ID_COLABORADOR != ASSIST3 && colaborador.ID_COLABORADOR != ASSIST4
        ) {
            document.getElementById("Colaborador_tarefa").innerHTML += `
                <option value="${colaborador.ID_COLABORADOR}">${colaborador.NOME_COLABORADOR}</option>
            `
            document.getElementById("Tarefa_assistencia1").innerHTML += `
                <option value="${colaborador.ID_COLABORADOR}">${colaborador.NOME_COLABORADOR}</option>
            `
            document.getElementById("Tarefa_assistencia2").innerHTML += `
                <option value="${colaborador.ID_COLABORADOR}">${colaborador.NOME_COLABORADOR}</option>
            `
            document.getElementById("Tarefa_assistencia3").innerHTML += `
                <option value="${colaborador.ID_COLABORADOR}">${colaborador.NOME_COLABORADOR}</option>
            `
            document.getElementById("Tarefa_assistencia4").innerHTML += `
                <option value="${colaborador.ID_COLABORADOR}">${colaborador.NOME_COLABORADOR}</option>
            `
        }
    }
}
async function EditarTarefa2(id) {
    const IDs = tarefa.ASSISTANT_COLABORADORES_ID || ""
    const ocorrencia = document.getElementById("Ocorrencia_tarefa").value
    const descricao = document.getElementById("Descricao_tarefa").value
    const classificacao = document.getElementById("Classificacao_tarefa").value
    const prioridade = document.getElementById("Prioridade_tarefa").value
    const setor = document.getElementById("Setor_tarefa").value
    const equipamento = document.getElementById("Equipamento_tarefa").value
    const colaborador = document.getElementById("Colaborador_tarefa").value
    const inicio = document.getElementById("Inicio_tarefa").value
    const termino = document.getElementById("Termino_tarefa").value
    const minutos = document.getElementById("Minutos_tarefa").value
    const qualidade = document.getElementById("Texto_qualidade").value
    const visto = document.getElementById("Visto_qualidade").checked
    const assist1 = document.getElementById("Tarefa_assistencia1").value || ""
    const assist2 = document.getElementById("Tarefa_assistencia2").value || ""
    const assist3 = document.getElementById("Tarefa_assistencia3").value || ""
    const assist4 = document.getElementById("Tarefa_assistencia4").value || ""
    let IDs2 = String(IDs)
    let splittedID = IDs2.split("e") || ""
    let assist1main = parseInt(splittedID[0]) || ""
    let assist2main = parseInt(splittedID[1]) || ""
    let assist3main = parseInt(splittedID[2]) || ""
    let assist4main = parseInt(splittedID[3]) || ""
    if (
        equipamento == "" || equipamento == null || equipamento == undefined || equipamento == null || colaborador == ""
        || colaborador == null || colaborador == undefined || colaborador == "null" ||
        setor == "" || setor == null || setor == undefined || setor == "null" ||
        inicio == "" || inicio == null || termino == "" || termino == null || minutos == null ||
        minutos == "" || prioridade == null || prioridade == ""
    ) {
        alert("Preencha os campos corretamente")
    } else {
        const request = await fetch(`http://192.168.69.187:5000/tarefa/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                "OCORRENCIA_TAREFA": ocorrencia,
                "DESCRICAO_TAREFA": descricao,
                "CLASSIFICACAO_TAREFA": classificacao,
                "PRIORIDADE_TAREFA": prioridade,
                "ID_SETOR": setor,
                "ID_EQUIPAMENTO": equipamento,
                "ID_COLABORADOR": colaborador,
                "DATA_TAREFA": inicio,
                "TERMINO_TAREFA": termino,
                "MINUTOS_TAREFA": minutos,
                "TEXTO_QUALIDADE": qualidade,
                "VISTO_QUALIDADE": visto,
                "ASSIST1_MAIN": assist1main,
                "ASSIST1": assist1,
                "ASSIST2_MAIN": assist2main,
                "ASSIST2": assist2,
                "ASSIST3_MAIN": assist3main,
                "ASSIST3": assist3,
                "ASSIST4_MAIN": assist4main,
                "ASSIST4": assist4
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (request.status == 200) {
            document.getElementById("PDF").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Tarefa atualizada com sucesso!</strong>
                </h1>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
        `
        } else {
            document.getElementById("PDF").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1 transparenciaFalse">
                    <strong>Não foi possível atualizar a tarefa</strong>
                </h1>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>    
            </div>
        </div>
        `
        }
    }
}
function baixarPDF(id) {
    document.getElementById("PopUpDiv").style.width = "100%"
    // document.getElementById("PopUpDiv").style.pageBreakAfter = "always"
    // document.getElementById("PopUpDiv").style.pageBreakBefore = "avoid"
    document.getElementById("PopUpDiv").style.border = "none"
    document.getElementById("PopUpTotal").style.width = "50%"
    document.getElementById("PopUpTotal").style.backgroundColor = "white"
    // document.getElementById("PopUpTotal").style.height = "100%"
    document.getElementById("PopUpTotal").style.margin = "auto"
    document.getElementById("PopUpTotal").style.pageBreakInside = "always"
    document.getElementById("PopUpTotal").style.pageBreakBefore = "avoid"
    document.getElementById("PopUpTotal").style.pageBreakafter = "always"
    document.getElementById("PopUpTotal").style.pageBreakBefore = "always"
    document.getElementById("TextoDaQualidade").style.pageBreakInside = "always"
    document.getElementById("TextoDaQualidade").style.pageBreakAfter = "always"
    document.getElementById("TextoDaQualidade").style.display = "block"
    const botoes = document.querySelectorAll(".BotaoPadrao22")
    botoes.forEach(botao => {
        botao.style.display = "none"
    });
    const Baixar = document.getElementById("PopUpTotal")
    let opcoes = {
        margin: 0,
        filename: `OrdemServiço${id}.pdf`,
        image: { type: "jpeg", quality: 2 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' }
    }
    html2pdf().from(Baixar).set(opcoes).save();
    PopUpPDF()
    document.getElementById("PopUpDiv").style.width = "60%"
    document.getElementById("PopUpDiv").style.height = ""
    // document.getElementById("TextoDaQualidade").style.display = "none"
}
function PopUpPDF() {
    document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv">
                <h1 class="TextoH1">
                    O download do arquivo está em execução!
                </h1>
                <p>
                     Isso pode demorar um pouco.
                </p>
                <br>
                <p>
                    Espere o download finalizar e feche este aviso.
                </p>
                <br>
                <br>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
            </div>
        </div>`
}
