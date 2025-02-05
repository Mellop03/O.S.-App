import { equipamentoURL } from "./constants.js";

export async function get_equipamento(){
    const request = await fetch(equipamentoURL + "/listar")
    if (request.status == 200){
        const data = await request.json()
        return data
    }
}
export async function novo_equipamento(Nome, Identificacao){
    console.log("SIM")
    const request = await fetch(equipamentoURL + "/novoequipamento", {
        method: "POST",
        body: JSON.stringify({
            "NOME_EQUIPAMENTO": Nome,
            "IDENTIFICACAO_EQUIPAMENTO": Identificacao
        }),
        headers: {
            'Content-Type': "application/json",
        }
    })
    if (request.status == 200){
        window.location.href = "./equipamentos_admin.html"
    }
}
export async function get_equipamento_filtro(){
    const request = await fetch(equipamentoURL + "/listarequipamentofiltro")
    if(request.status == 200){
        const data = await request.json()
        return data
    } else {
        return false
    }
}