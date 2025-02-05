import { setorURL } from "./constants.js"

export async function get_setor() {
    const request = await fetch(setorURL + "/listar")
    if (request.status == 200) {
        const data = await request.json()
        return data
    }
}
export async function novoSetor(Nome, Identificacao){
    const request = await fetch(setorURL + "/novosetor", {
        method: 'POST',
        body: JSON.stringify({
            "NOME_SETOR": Nome,
            "IDENTIFICACAO_SETOR": Identificacao
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (request.status == 200){
        window.location.href = "./setores_admin.html"
    }
}
export async function get_setor_filtro(){
    const request = await fetch(setorURL + '/listarfiltro')
    if (request.status == 200){
        const data = await request.json()
        return data
    } else {
        return false
    }
}