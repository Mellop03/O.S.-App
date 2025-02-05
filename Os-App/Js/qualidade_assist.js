async function EditarTarefaQualidade(id) {
    const request = await fetch(`http://192.168.69.187:5000/tarefa/listar/${id}`)
    if(request.status == 200){
        const data = await request.json()
        let equipamento = data.NOME_EQUIPAMENTO || "N/A"
        let setor = data.NOME_SETOR || "N/A"
        let colaborador = data.NOME_COLABORADOR || "N/A"
        let assist = data.ASSISTANT_COLABORADORES || ""
        if (assist != null && assist != ""){
            assist = `, ${assist}`
        } else{
            assist = ""
        }
        document.getElementById("Bode").innerHTML += `
        <div id="PopUpTotal" class="PopUpTotal">
            <div class="PopUpDiv" id="PopUpDiv">
                <h1 class="TextoH1">
                    ${data.OCORRENCIA_TAREFA}
                </h1>
                <p class="TotalQualidade2">Detalhes: ${data.DESCRICAO_TAREFA} </p>
                <p class="TotalQualidade2">Classificação: <spam class="${data.CLASSIFICACAO_TAREFA}">${data.CLASSIFICACAO_TAREFA}</spam></p>
                <p class="TotalQualidade2">Prioridade: ${data.PRIORIDADE_TAREFA}</p>
                <p class="TotalQualidade2">Colaborador: ${colaborador}${assist}</p>
                <p class="TotalQualidade2">Setor: ${setor}</p>
                <p class="TotalQualidade2">Equipamento: ${equipamento}</p>
                <p class="TotalQualidade2">Tempo decorrido: ${data.MINUTOS_TAREFA} minutos</p>
                <p class="TotalQualidade2">data de início: ${data.DATA_TAREFA}</p>
                <p class="TotalQualidade2">data de término: ${data.TERMINO_TAREFA}</p>
                <p class="TotalQualidade2">Visto: <input id="visto_qualidade" type="checkbox"/></p>
                <p class="PTarefa">
                    Comentário (não obrigatório):
                    <input placeholder="Digite aqui seu comentário" type="text" id="texto_qualidade" value="${data.TEXTO_QUALIDADE}" class="form-control"/>
                </p>
                <br>
                <button class="BotaoPadrao2" onclick="EditarTarefaQualidade2(${data.ID_TAREFA})">Atualizar tarefa</button>
                <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
            </div>
        </div>
        `
    } else {
        return false
    }
}
function FecharPopUp() {
    window.location.reload()
    document.getElementById("PopUpTotal").remove()
}
async function EditarTarefaQualidade2(id){
    const visto = document.getElementById("visto_qualidade").checked
    console.log(visto)
    const texto = document.getElementById("texto_qualidade").value
    const request = await fetch(`http://192.168.69.187:5000/tarefa/editarqualidade/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            "VISTO_QUALIDADE": visto,
            "TEXTO_QUALIDADE": texto
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (request.status == 200){
        document.getElementById("PopUpDiv").innerHTML = `
        <h1 class="TextoH1 transparenciaFalse">
            <strong>tarefa atualizada com sucesso</strong>
        </h1>
        <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
        `
    } else {
        document.getElementById("PopUpDiv").innerHTML = `
        <h1 class="TextoH1 transparenciaFalse">
            <strong>ão foi possível atuaizar a tarefa</strong>
        </h1>
        <button class="BotaoPadrao2" onclick="FecharPopUp()">Voltar</button>
        `
    }
}