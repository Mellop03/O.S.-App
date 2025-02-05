import mysql.connector

def criar_conexao():
    return mysql.connector.connect(
    host= "localhost", 
    user= "root",
    password= "melo.03", 
    database= "meloos")
    
def fechar_conexao(conexao):
    if conexao:
        conexao.close()