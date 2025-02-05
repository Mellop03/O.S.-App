from flask import Flask, jsonify, request, Blueprint
from conexao import criar_conexao, fechar_conexao

equipamento_bp = Blueprint('equipamento', __name__)

@equipamento_bp.route('/listar', methods = ['GET'])
def listar_equipamento():
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM EQUIPAMENTOS')
    equipamento = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(equipamento)

@equipamento_bp.route('/listaridnome', methods = ['GET'])
def listar_equipamento_idnome():
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT ID_EQUIPAMENTO, NOME_EQUIPAMENTO FROM EQUIPAMENTOS')
    equipamento = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(equipamento)

@equipamento_bp.route('/listarequipamentofiltro', methods = ['GET'])
def listar_equipamento_filtro():
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT IDENTIFICACAO_EQUIPAMENTO, NOME_EQUIPAMENTO FROM EQUIPAMENTOS')
    equipamento = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(equipamento)

@equipamento_bp.route('/listar/<int:id>', methods = ['GET'])
def listar_equipamento_por_id(id):
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM EQUIPAMENTOS WHERE ID_EQUIPAMENTO = %s', (id, ))
    equipamento = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(equipamento)

@equipamento_bp.route('/novoequipamento', methods = ['POST'])
def criar_setor():
    data = request.json
    NOME_EQUIPAMENTO = data['NOME_EQUIPAMENTO']
    IDENTIFICACAO_EQUIPAMENTO = data['IDENTIFICACAO_EQUIPAMENTO']
    conn = criar_conexao()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO EQUIPAMENTOS (NOME_EQUIPAMENTO, IDENTIFICACAO_EQUIPAMENTO)'
                   'VALUES (%s, %s)',
                   (NOME_EQUIPAMENTO, IDENTIFICACAO_EQUIPAMENTO))                 
    conn.commit()
    cursor.close()
    fechar_conexao(conn)
    return jsonify({'mensagem': 'Equipamento criado com sucesso'}), 200

@equipamento_bp.route('/<int:id_equipamento>', methods = {'PUT'})
def atualizar_equipamento(id_equipamento):
    data = request.get_json()
    NOME_EQUIPAMENTO = data['NOME_EQUIPAMENTO']
    IDENTIFICACAO_EQUIPAMENTO = data['IDENTIFICACAO_EQUIPAMENTO']
    conn = criar_conexao()
    cursor = conn.cursor()
    sql = 'UPDATE EQUIPAMENTOS SET NOME_EQUIPAMENTO = %s, IDENTIFICACAO_EQUIPAMENTO = %s WHERE ID_EQUIPAMENTO = %s'
    valores = (NOME_EQUIPAMENTO, IDENTIFICACAO_EQUIPAMENTO, id_equipamento)
    cursor.execute(sql, valores)
    conn.commit()
    cursor.close()
    fechar_conexao(conn)
    return jsonify({'mensagem': "Setor atualizado com sucesso"}), 200

@equipamento_bp.route('/<int:id_equipamento>', methods = {'DELETE'})
def deletar_equipamento(id_equipamento):
    conn = criar_conexao()
    cursor = conn.cursor()
    sql = 'DELETE FROM EQUIPAMENTOS WHERE ID_EQUIPAMENTO = %s'
    valor = (id_equipamento, )
    try:
        cursor.execute(sql, valor)
        conn.commit()
        return jsonify({'mensagem': "Equipamento deletado com sucesso"}), 200
    except Exception as err:
        conn.rollback()
        return jsonify({'mensagem': f'Erro ao deletar o equipamento: {err}'}), 500
    finally:
        cursor.close()
        fechar_conexao(conn)