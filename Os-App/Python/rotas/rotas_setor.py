from flask import Flask, jsonify, request, Blueprint
from conexao import criar_conexao, fechar_conexao

setor_bp = Blueprint('setor', __name__)

@setor_bp.route('/listar', methods = ['GET'])
def listar_setor():
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM SETORES')
    setor = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(setor)

@setor_bp.route('/listaridnome', methods = ['GET'])
def listar_setor_idnome():
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT ID_SETOR, NOME_SETOR FROM SETORES')
    setor = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(setor)

@setor_bp.route('/listarfiltro', methods = ['GET'])
def listar_setor_filtro():
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT IDENTIFICACAO_SETOR, NOME_SETOR FROM SETORES')
    setor = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(setor)

@setor_bp.route('/listar/<int:id>', methods = ['GET'])
def listar_setor_por_id(id):
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM SETORES WHERE ID_SETOR = %s',
                   (id,))
    setor = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(setor)

@setor_bp.route('/novosetor', methods = ['POST'])
def criar_setor():
    data = request.json
    NOME_SETOR = data['NOME_SETOR']
    IDENTIFICACAO_SETOR = data['IDENTIFICACAO_SETOR']
    conn = criar_conexao()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO SETORES (NOME_SETOR, IDENTIFICACAO_SETOR)'
                   'VALUES (%s, %s)',
                   (NOME_SETOR, IDENTIFICACAO_SETOR))                 
    conn.commit()
    cursor.close()
    fechar_conexao(conn)
    return jsonify({'mensagem': 'Setor criado com sucesso'}), 200

@setor_bp.route('/<int:id_setor>', methods = {'PUT'})
def atualizar_setor(id_setor):
    data = request.get_json()
    NOME_SETOR = data['NOME_SETOR']
    IDENTIFICACAO_SETOR = data['IDENTIFICACAO_SETOR']
    conn = criar_conexao()
    cursor = conn.cursor()
    sql = 'UPDATE SETORES SET NOME_SETOR = %s, IDENTIFICACAO_SETOR = %s WHERE ID_SETOR = %s'
    valores = (NOME_SETOR, IDENTIFICACAO_SETOR, id_setor)
    cursor.execute(sql, valores)
    conn.commit()
    cursor.close()
    fechar_conexao(conn)
    return jsonify({'mensagem': "Setor atualizado com sucesso"}), 200

@setor_bp.route('/<int:id_setor>', methods = {'DELETE'})
def deletar_setor(id_setor):
    conn = criar_conexao()
    cursor = conn.cursor()
    sql = 'DELETE FROM SETORES WHERE ID_SETOR = %s'
    valor = (id_setor, )
    try:
        cursor.execute(sql, valor)
        conn.commit()
        return jsonify({'mensagem': "Setor deletado com sucesso"}), 200
    except Exception as err:
        conn.rollback()
        return jsonify({'mensagem': f'Erro ao deletar o setor: {err}'}), 500
    finally:
        cursor.close()
        fechar_conexao(conn)