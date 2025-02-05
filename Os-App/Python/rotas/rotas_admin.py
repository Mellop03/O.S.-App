from flask import Flask, jsonify, request, Blueprint
from conexao import criar_conexao, fechar_conexao
from hashlib import sha256

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/listar', methods = ['GET'])
def listar_admin():
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM ADMINS')
    admin = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(admin)

@admin_bp.route('/listar/<int:id>', methods = ['GET'])
def listar_admin_id(id):
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT NOME_ADMIN, LOGIN_ADMIN, ID_ADMIN FROM ADMINS WHERE ID_ADMIN = %s',
                   (id, ))
    admin = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(admin)

@admin_bp.route('/novoadmin', methods = ['POST'])
def criar_admin():
    data = request.json
    NOME_ADMIN = data['NOME_ADMIN']
    LOGIN_ADMIN = data['LOGIN_ADMIN']
    SENHA_ADMIN = data['SENHA_ADMIN']
    senhaCripto = sha256(SENHA_ADMIN.encode('utf-8')).hexdigest()
    conn = criar_conexao()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM ADMINS WHERE LOGIN_ADMIN = %s', (LOGIN_ADMIN, ))
    Verificar =  cursor.fetchone()
    if Verificar == None:
        cursor.execute('INSERT INTO ADMINS (NOME_ADMIN, LOGIN_ADMIN, SENHA_ADMIN)'
                   'VALUES (%s, %s, %s)',
                   (NOME_ADMIN, LOGIN_ADMIN, senhaCripto))
        conn.commit()
        cursor.close()
        fechar_conexao(conn)
        return jsonify({'mensagem': 'Admin criado com sucesso'}), 200
    else: 
        conn.commit()
        cursor.close()
        fechar_conexao(conn)
        return jsonify({'mensagem': 'Login já existente'}), 400
    
   

@admin_bp.route('/<int:id_admin>', methods = {'PUT'})
def atualizar_admin(id_admin):
    data = request.get_json()
    NOME_ADMIN = data['NOME_ADMIN']
    LOGIN_ADMIN = data['LOGIN_ADMIN']
    conn = criar_conexao()
    cursor = conn.cursor()
    sql = 'UPDATE ADMINS SET NOME_ADMIN = %s, LOGIN_ADMIN = %s WHERE ID_ADMIN = %s'
    valores = (NOME_ADMIN, LOGIN_ADMIN, id_admin)
    cursor.execute(sql, valores)
    conn.commit()
    cursor.close()
    fechar_conexao(conn)
    return jsonify({'mensagem': "Admin atualizado com sucesso"}), 200

# @admin_bp.route('/<int:id_admin>', methods = {'PUT'})
# def atualizar_admin(id_admin):
#     data = request.get_json()
#     NOME_ADMIN = data['NOME_ADMIN']
#     LOGIN_ADMIN = data['LOGIN_ADMIN']
#     SENHA_ADMIN = data['SENHA_ADMIN']
#     senhaCripto = sha256(SENHA_ADMIN.encode('utf-8')).hexdigest()
#     conn = criar_conexao()
#     cursor = conn.cursor()
#     sql = 'UPDATE ADMINS SET NOME_ADMIN = %s, LOGIN_ADMIN = %s, SENHA_ADMIN = %s WHERE ID_ADMIN = %s'
#     valores = (NOME_ADMIN, LOGIN_ADMIN, senhaCripto, id_admin)
#     cursor.execute(sql, valores)
#     conn.commit()
#     cursor.close()
#     fechar_conexao(conn)
#     return jsonify({'mensagem': "Admin atualizado com sucesso"}), 200

@admin_bp.route('/<int:id_admin>', methods = {'DELETE'})
def deletar_admin(id_admin):
    conn = criar_conexao()
    cursor = conn.cursor()
    sql = 'DELETE FROM ADMINS WHERE ID_ADMIN = %s'
    valor = (id_admin, )
    try:
        cursor.execute(sql, valor)
        conn.commit()
        return jsonify({'mensagem': "Admin deletado com sucesso"}), 200
    except Exception as err:
        conn.rollback()
        return jsonify({'mensagem': f'Erro ao deletar o admin: {err}'}), 500
    finally:
        cursor.close()
        fechar_conexao(conn)
        
        
@admin_bp.route('/login', methods=['POST'])
def login_admin():
    data = request.json
    LOGIN_ADMIN = data['LOGIN_ADMIN']
    SENHA_ADMIN = data['SENHA_ADMIN']
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT ID_ADMIN, SENHA_ADMIN, NOME_ADMIN, EXISTS_ADMIN FROM ADMINS WHERE LOGIN_ADMIN = %s",
                   (LOGIN_ADMIN, ))
    SenhaBanco = cursor.fetchone()
    fechar_conexao(conn)
    if checar_senha(SenhaBanco['SENHA_ADMIN'], SENHA_ADMIN):        
        return jsonify({'Id': SenhaBanco['ID_ADMIN'], 'Nome': SenhaBanco['NOME_ADMIN'], "admin": SenhaBanco['EXISTS_ADMIN']}), 200
    else:
        return jsonify({"Mensagem": "Usuário ou senha incorretos"}), 401
    
def checar_senha(SenhaBanco, SENHA_ADMIN):
        senha_convertida = sha256(SENHA_ADMIN.encode('utf-8')).hexdigest()
        return SenhaBanco == senha_convertida