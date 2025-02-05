from flask import Flask, jsonify, request, Blueprint
from conexao import criar_conexao, fechar_conexao
from hashlib import sha256

colaborador_bp = Blueprint('colaborador', __name__)

@colaborador_bp.route('/listar', methods = ['GET'])
def listar_colaborador():
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT NOME_COLABORADOR, IDENTIFICACAO_COLABORADOR, ID_COLABORADOR, FUNCAO_COLABORADOR FROM COLABORADORES')
    colaborador = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(colaborador)

@colaborador_bp.route('/listaridnome', methods = ['GET'])
def listar_colaborador_idnome():
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT NOME_COLABORADOR, ID_COLABORADOR, FUNCAO_COLABORADOR FROM COLABORADORES')
    colaborador = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(colaborador)

@colaborador_bp.route('/listarcolaboradorfiltro', methods = ['GET'])
def listar_colaborador_filtro():
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT NOME_COLABORADOR, IDENTIFICACAO_COLABORADOR FROM COLABORADORES')
    colaborador = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(colaborador)

@colaborador_bp.route('/listar/<int:id>', methods = ['GET'])
def listar_colaborador_por_id(id):
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM COLABORADORES WHERE ID_COLABORADOR = %s', (id, ))
    colaborador = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(colaborador)

@colaborador_bp.route('/novocolaborador', methods = ['POST'])
def criar_colaborador():
    data = request.json
    NOME_COLABORADOR = data['NOME_COLABORADOR']
    IDENTIFICACAO_COLABORADOR = data['IDENTIFICACAO_COLABORADOR']
    FUNCAO_COLABORADOR = data['FUNCAO_COLABORADOR']
    LOGIN_COLABORADOR = data['LOGIN_COLABORADOR']
    SENHA_COLABORADOR = data['SENHA_COLABORADOR']
    senhaCripto = sha256(SENHA_COLABORADOR.encode('utf-8')).hexdigest()
    conn = criar_conexao()
    cursor = conn.cursor()
    cursor.execute('SELECT ID_COLABORADOR FROM COLABORADORES WHERE LOGIN_COLABORADOR = %s', (LOGIN_COLABORADOR, ))
    Verificar = cursor.fetchone()
    if Verificar == None:
        cursor.execute('INSERT INTO COLABORADORES (NOME_COLABORADOR, LOGIN_COLABORADOR, SENHA_COLABORADOR, IDENTIFICACAO_COLABORADOR, FUNCAO_COLABORADOR)'
                   'VALUES (%s, %s, %s, %s, %s)',
                   (NOME_COLABORADOR, LOGIN_COLABORADOR, senhaCripto, IDENTIFICACAO_COLABORADOR, FUNCAO_COLABORADOR))
        conn.commit()
        cursor.close()
        fechar_conexao(conn)
        return jsonify({'mensagem': 'Colaborador criado com sucesso'}), 200
    else: 
        conn.commit()
        cursor.close()
        fechar_conexao(conn)
        return jsonify({'mensagem': 'Erro ao criar o coloaborador'}), 400
    

@colaborador_bp.route('/<int:id_colaborador>', methods = {'PUT'})
def atualizar_colaborador(id_colaborador):
    data = request.get_json()
    NOME_COLABORADOR = data['NOME_COLABORADOR']
    IDENTIFICACAO_COLABORADOR = data['IDENTIFICACAO_COLABORADOR']
    LOGIN_COLABORADOR = data['LOGIN_COLABORADOR']
    FUNCAO_COLABORADOR = data['FUNCAO_COLABORADOR']
    conn = criar_conexao()
    cursor = conn.cursor()
    sql = 'UPDATE COLABORADORES SET NOME_COLABORADOR = %s, IDENTIFICACAO_COLABORADOR = %s, LOGIN_COLABORADOR = %s, FUNCAO_COLABORADOR = %s WHERE ID_COLABORADOR = %s'
    valores = (NOME_COLABORADOR, IDENTIFICACAO_COLABORADOR, LOGIN_COLABORADOR, FUNCAO_COLABORADOR, id_colaborador)
    cursor.execute(sql, valores)
    conn.commit()
    cursor.close()
    fechar_conexao(conn)
    return jsonify({'mensagem': "Colaborador atualizado com sucesso"}), 200

@colaborador_bp.route('/<int:id_colaborador>', methods = {'DELETE'})
def deletar_colaborador(id_colaborador):
    conn = criar_conexao()
    cursor = conn.cursor()
    sql = 'DELETE FROM COLABORADORES WHERE ID_COLABORADOR = %s'
    valor = (id_colaborador, )
    try:
        cursor.execute(sql, valor)
        conn.commit()
        return jsonify({'mensagem': "Colaborador deletado com sucesso"}), 200
    except Exception as err:
        conn.rollback()
        return jsonify({'mensagem': f'Erro ao deletar o colaborador: {err}'}), 500
    finally:
        cursor.close()
        fechar_conexao(conn)
        
        
@colaborador_bp.route('/login', methods=['POST'])
def login_colaborador():
    data = request.json
    LOGIN_COLABORADOR = data['LOGIN_COLABORADOR']
    SENHA_COLABORADOR = data['SENHA_COLABORADOR']
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT ID_COLABORADOR, SENHA_COLABORADOR, NOME_COLABORADOR, FUNCAO_COLABORADOR FROM COLABORADORES WHERE LOGIN_COLABORADOR = %s",
                   (LOGIN_COLABORADOR, ))
    SenhaBanco = cursor.fetchone()
    if SenhaBanco == None:
        return jsonify({'mensagem': "Login ou senha inválidos"}), 401
    fechar_conexao(conn)
    if checar_senha(SenhaBanco['SENHA_COLABORADOR'], SENHA_COLABORADOR):        
        return jsonify({'Id': SenhaBanco['ID_COLABORADOR'], 'Nome': SenhaBanco['NOME_COLABORADOR'], 'Funcao': SenhaBanco['FUNCAO_COLABORADOR']}), 200
    else:
        return jsonify({"Mensagem": "Usuário ou senha incorretos"}), 401
    
def checar_senha(SenhaBanco, SENHA_COLABORADOR):
        senha_convertida = sha256(SENHA_COLABORADOR.encode('utf-8')).hexdigest()
        return SenhaBanco == senha_convertida