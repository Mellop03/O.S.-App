export const baseURL = "http://192.168.69.187:5000"
export const colaboradorURL = "http://192.168.69.187:5000/colaborador"
export const adminURL = "http://192.168.69.187:5000/admin"
export const setorURL = "http://192.168.69.187:5000/setor"
export const equipamentoURL = "http://192.168.69.187:5000/equipamento"
export const tarefaURL = "http://192.168.69.187:5000/tarefa"
export function log_out() {
    localStorage.setItem("LoggedIn", null)
    window.location.href = '../index.html';
}
export function Verificar_Login(verify) {
        if (verify.Funcao == "Colaborador") {
            window.location.href = '../Html/Colaborador/home_colaborador.html';
        } else if (verify.Funcao == "Qualidade") {
            window.location.href = "../Html/Qualidade/home_qualidade.html"
        } else if ("admin" in verify){
            window.location.href = "../Html/Admin/home_admin.html"
        }
}