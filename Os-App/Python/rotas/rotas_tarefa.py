from flask import Flask, jsonify, request, Blueprint
from conexao import criar_conexao, fechar_conexao

tarefa_bp = Blueprint('tarefa', __name__)

@tarefa_bp.route('/listar', methods = ['GET'])
def listar_tarefa():
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute('SELECT * FROM TAREFAS')
    tarefa = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(tarefa)

@tarefa_bp.route('/listarcompleto/<int:id>', methods = ['GET'])
def listar_tarefa_completa_id(id):
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""SELECT T.ID_TAREFA, T.OCORRENCIA_TAREFA, T.DESCRICAO_TAREFA, T.DATA_TAREFA,
                    T.TERMINO_TAREFA, T.CLASSIFICACAO_TAREFA, T.FINALIZADA_TAREFA,
                    T.MINUTOS_TAREFA, T.PRIORIDADE_TAREFA, S.ID_SETOR, S.NOME_SETOR,
                    E.ID_EQUIPAMENTO, E.NOME_EQUIPAMENTO, C.ID_COLABORADOR, C.NOME_COLABORADOR,
                    T.VISTO_QUALIDADE, T.TEXTO_QUALIDADE,
                    GROUP_CONCAT(C2.ID_COLABORADOR ORDER BY C2.ID_COLABORADOR SEPARATOR 'e') AS ASSISTANT_COLABORADORES_ID,
                    GROUP_CONCAT(C2.NOME_COLABORADOR ORDER BY C2.ID_COLABORADOR SEPARATOR ' e ') AS ASSISTANT_COLABORADORES
                    FROM TAREFAS T
                    LEFT JOIN COLABORADOR_TAREFA CT ON T.ID_TAREFA = CT.ID_TAREFA
                    LEFT JOIN COLABORADORES C2 ON CT.ID_COLABORADOR = C2.ID_COLABORADOR
                    LEFT JOIN SETORES S ON T.ID_SETOR = S.ID_SETOR
                    LEFT JOIN EQUIPAMENTOS E ON T.ID_EQUIPAMENTO = E.ID_EQUIPAMENTO
                    LEFT JOIN COLABORADORES C ON T.ID_COLABORADOR = C.ID_COLABORADOR
                    WHERE T.ID_TAREFA = %s
                    GROUP BY T.ID_TAREFA""", (id, ))
    tarefa = cursor.fetchone()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(tarefa)

@tarefa_bp.route('/listarcompleta', methods = ['GET'])
def listar_tarefa_completa():
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""SELECT T.ID_TAREFA, T.OCORRENCIA_TAREFA, T.DESCRICAO_TAREFA,
                    T.DATA_TAREFA, T.TERMINO_TAREFA, T.CLASSIFICACAO_TAREFA, T.FINALIZADA_TAREFA,
                    T.MINUTOS_TAREFA, T.PRIORIDADE_TAREFA, S.NOME_SETOR, E.NOME_EQUIPAMENTO,
                    C.NOME_COLABORADOR, T.VISTO_QUALIDADE, T.TEXTO_QUALIDADE,
                    GROUP_CONCAT(C2.NOME_COLABORADOR ORDER BY C2.ID_COLABORADOR SEPARATOR ' e ') AS ASSISTANT_COLABORADORES
                    FROM TAREFAS T
                    LEFT JOIN COLABORADOR_TAREFA CT ON T.ID_TAREFA = CT.ID_TAREFA
                    LEFT JOIN COLABORADORES C2 ON CT.ID_COLABORADOR = C2.ID_COLABORADOR
                    JOIN SETORES S ON T.ID_SETOR = S.ID_SETOR
                    JOIN EQUIPAMENTOS E ON T.ID_EQUIPAMENTO = E.ID_EQUIPAMENTO
                    JOIN COLABORADORES C ON T.ID_COLABORADOR = C.ID_COLABORADOR
                    GROUP BY T.ID_TAREFA""")
    tarefa = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(tarefa)

@tarefa_bp.route('/listaraberta', methods = ['GET'])
def listar_tarefa_aberta():
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""SELECT T.ID_TAREFA, T.OCORRENCIA_TAREFA, T.DESCRICAO_TAREFA, T.DATA_TAREFA, T.TERMINO_TAREFA, T.CLASSIFICACAO_TAREFA,
                  T.MINUTOS_TAREFA, T.PRIORIDADE_TAREFA, S.NOME_SETOR, E.NOME_EQUIPAMENTO FROM TAREFAS T
                  JOIN SETORES S ON T.ID_SETOR = S.ID_SETOR
                  JOIN EQUIPAMENTOS E ON T.ID_EQUIPAMENTO = E.ID_EQUIPAMENTO
                    WHERE FINALIZADA_TAREFA=0""")
    tarefa = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(tarefa)

@tarefa_bp.route('/listarcompletatabela', methods = ['GET'])
def listar_tarefa_tabela():
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""SELECT T.ID_TAREFA, T.OCORRENCIA_TAREFA, T.DESCRICAO_TAREFA, T.DATA_TAREFA, T.TERMINO_TAREFA, T.CLASSIFICACAO_TAREFA, T.FINALIZADA_TAREFA,
                  T.MINUTOS_TAREFA, T.PRIORIDADE_TAREFA, S.IDENTIFICACAO_SETOR, S.NOME_SETOR,
                    E.IDENTIFICACAO_EQUIPAMENTO, E.NOME_EQUIPAMENTO, C.IDENTIFICACAO_COLABORADOR,
                    T.VISTO_QUALIDADE, T.TEXTO_QUALIDADE,
                    GROUP_CONCAT(C2.IDENTIFICACAO_COLABORADOR ORDER BY C2.ID_COLABORADOR SEPARATOR ' e ') AS ASSISTANT_COLABORADORES FROM TAREFAS T
                    LEFT JOIN SETORES S ON T.ID_SETOR = S.ID_SETOR
                    LEFT JOIN COLABORADOR_TAREFA CT ON T.ID_TAREFA = CT.ID_TAREFA
                    LEFT JOIN COLABORADORES C2 ON CT.ID_COLABORADOR = C2.ID_COLABORADOR
                    LEFT JOIN EQUIPAMENTOS E ON T.ID_EQUIPAMENTO = E.ID_EQUIPAMENTO
                    LEFT JOIN COLABORADORES C ON T.ID_COLABORADOR = C.ID_COLABORADOR
                    GROUP BY T.ID_TAREFA""")
    tarefa = cursor.fetchall()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(tarefa)

@tarefa_bp.route('/listar/<int:id>', methods = ['GET'])
def listar_tarefa_completa_ID(id):
    conn = criar_conexao()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""SELECT T.ID_TAREFA, T.OCORRENCIA_TAREFA, T.DESCRICAO_TAREFA, T.DATA_TAREFA,
                    T.TERMINO_TAREFA, T.CLASSIFICACAO_TAREFA,
                    T.MINUTOS_TAREFA, T.PRIORIDADE_TAREFA, S.NOME_SETOR, E.NOME_EQUIPAMENTO,
                    C.NOME_COLABORADOR, T.VISTO_QUALIDADE, T.TEXTO_QUALIDADE,
                    GROUP_CONCAT(C2.NOME_COLABORADOR ORDER BY C2.ID_COLABORADOR SEPARATOR ' e ') AS ASSISTANT_COLABORADORES
                    FROM TAREFAS T
                    LEFT JOIN COLABORADOR_TAREFA CT ON T.ID_TAREFA = CT.ID_TAREFA
                    LEFT JOIN COLABORADORES C2 ON CT.ID_COLABORADOR = C2.ID_COLABORADOR
                    JOIN SETORES S ON T.ID_SETOR = S.ID_SETOR
                    JOIN EQUIPAMENTOS E ON T.ID_EQUIPAMENTO = E.ID_EQUIPAMENTO
                    JOIN COLABORADORES C ON T.ID_COLABORADOR = C.ID_COLABORADOR 
                    WHERE T.ID_TAREFA = %s
                    GROUP BY T.ID_TAREFA""", (id, ))
    tarefa = cursor.fetchone()
    cursor.close()
    fechar_conexao(conn)
    return jsonify(tarefa)

@tarefa_bp.route('/novatarefa', methods = ['POST'])
def criar_tarefa():
    data = request.json
    OCORRENCIA_TAREFA = data['OCORRENCIA_TAREFA']
    DESCRICAO_TAREFA = data['DESCRICAO_TAREFA']
    DATA_TAREFA = data['DATA_TAREFA']
    TERMINO_TAREFA = data['TERMINO_TAREFA']
    CLASSIFICACAO_TAREFA = data['CLASSIFICACAO_TAREFA']
    MINUTOS_TAREFA = data['MINUTOS_TAREFA']
    ID_SETOR = data['ID_SETOR']
    ID_EQUIPAMENTO = data['ID_EQUIPAMENTO']
    ID_COLABORADOR = data['ID_COLABORADOR']
    VISTO_QUALIDADE = data['VISTO_QUALIDADE']
    TEXTO_QUALIDADE = data['TEXTO_QUALIDADE']
    PRIORIDADE_TAREFA = data['PRIORIDADE_TAREFA']
    TAREFA_ASSIST1 = data['TAREFA_ASSIST1']
    TAREFA_ASSIST2 = data['TAREFA_ASSIST2']
    TAREFA_ASSIST3 = data['TAREFA_ASSIST3']
    TAREFA_ASSIST4 = data['TAREFA_ASSIST4']
    conn = criar_conexao()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO TAREFAS (OCORRENCIA_TAREFA, DESCRICAO_TAREFA, DATA_TAREFA, TERMINO_TAREFA, CLASSIFICACAO_TAREFA, MINUTOS_TAREFA, ID_SETOR, ID_EQUIPAMENTO, ID_COLABORADOR, VISTO_QUALIDADE, TEXTO_QUALIDADE, PRIORIDADE_TAREFA, FINALIZADA_TAREFA)'
                   'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                   (OCORRENCIA_TAREFA, DESCRICAO_TAREFA, DATA_TAREFA, TERMINO_TAREFA, CLASSIFICACAO_TAREFA, MINUTOS_TAREFA, ID_SETOR, ID_EQUIPAMENTO, ID_COLABORADOR, VISTO_QUALIDADE, TEXTO_QUALIDADE, PRIORIDADE_TAREFA, 1))
    cursor.execute('SELECT ID_TAREFA FROM TAREFAS')
    tarefas = cursor.fetchall()
    lastID = 0
    if TAREFA_ASSIST1 != "Nulo" and TAREFA_ASSIST1 != None:
        for tarefa in tarefas:
            if tarefa[0] > lastID:
                lastID = tarefa[0]
        cursor.execute('INSERT INTO COLABORADOR_TAREFA (ID_TAREFA, ID_COLABORADOR) VALUES (%s, %s)', (lastID, TAREFA_ASSIST1))
    if TAREFA_ASSIST2 != "Nulo" and TAREFA_ASSIST2 != None:
        for tarefa in tarefas:
            if tarefa[0] > lastID:
                lastID = tarefa[0]
        cursor.execute('INSERT INTO COLABORADOR_TAREFA (ID_TAREFA, ID_COLABORADOR) VALUES (%s, %s)', (lastID, TAREFA_ASSIST2))
    if TAREFA_ASSIST3 != "Nulo" and TAREFA_ASSIST3 != None:
        for tarefa in tarefas:
            if tarefa[0] > lastID:
                lastID = tarefa[0]
        cursor.execute('INSERT INTO COLABORADOR_TAREFA (ID_TAREFA, ID_COLABORADOR) VALUES (%s, %s)', (lastID, TAREFA_ASSIST3))
    if TAREFA_ASSIST4 != "Nulo" and TAREFA_ASSIST4 != None:
        for tarefa in tarefas:
            if tarefa[0] > lastID:
                lastID = tarefa[0]
        cursor.execute('INSERT INTO COLABORADOR_TAREFA (ID_TAREFA, ID_COLABORADOR) VALUES (%s, %s)', (lastID, TAREFA_ASSIST4))
    conn.commit()
    cursor.close()
    fechar_conexao(conn)
    return jsonify({'mensagem': 'Tarefa criada com sucesso'}), 200

# @tarefa_bp.route('/sim', methods = ['GET'])
# def sim():
#     conn = criar_conexao()
#     cursor = conn.cursor()
#     cursor.execute('SELECT ID_TAREFA FROM TAREFAS')
#     tarefas = cursor.fetchall()                 
#     conn.commit()
#     cursor.close()
#     fechar_conexao(conn)
#     return jsonify(tarefas), 200

# @tarefa_bp.route('/writetable', methods = ['GET'])
# def sim():
#     conn = criar_conexao()
#     cursor = conn.cursor()
#     cursor.execute('SELECT * FROM TAREFAS')
#     tarefas = cursor.fetchall()  
#     for i in tarefas:
#         tar = i[0]
#         print(f"aqui-------Tarefa---------------------{tar}")
#         col = i[9]
#         print(f"aqui----------Colaborador------------------{col}")
#         if col == None or col == "":
#             print("None")
#         else:
#             cursor.execute("INSERT INTO COLABORADOR_TAREFA (ID_TAREFA, ID_COLABORADOR) VALUES (%s, %s)", (tar, col))               
#     conn.commit()
#     cursor.close()
#     fechar_conexao(conn)
#     return jsonify({'mensagem': 'Preenchida a segunda tabela'}), 200

@tarefa_bp.route('/abrirtarefa', methods = ['POST'])
def abrir_tarefa():
    data = request.json
    OCORRENCIA_TAREFA = data['OCORRENCIA_TAREFA']
    DESCRICAO_TAREFA = data['DESCRICAO_TAREFA']
    DATA_TAREFA = data['DATA_TAREFA']
    TERMINO_TAREFA = data['TERMINO_TAREFA']
    CLASSIFICACAO_TAREFA = data['CLASSIFICACAO_TAREFA']
    MINUTOS_TAREFA = data['MINUTOS_TAREFA']
    ID_SETOR = data['ID_SETOR']
    ID_EQUIPAMENTO = data['ID_EQUIPAMENTO']
    ID_COLABORADOR = None
    VISTO_QUALIDADE = None
    TEXTO_QUALIDADE = ""
    PRIORIDADE_TAREFA = data['PRIORIDADE_TAREFA']
    conn = criar_conexao()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO TAREFAS (OCORRENCIA_TAREFA, DESCRICAO_TAREFA, DATA_TAREFA, TERMINO_TAREFA, CLASSIFICACAO_TAREFA, MINUTOS_TAREFA, ID_SETOR, ID_EQUIPAMENTO, ID_COLABORADOR, VISTO_QUALIDADE, TEXTO_QUALIDADE, PRIORIDADE_TAREFA, FINALIZADA_TAREFA)'
                   'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
                   (OCORRENCIA_TAREFA, DESCRICAO_TAREFA, DATA_TAREFA, TERMINO_TAREFA, CLASSIFICACAO_TAREFA, MINUTOS_TAREFA, ID_SETOR, ID_EQUIPAMENTO, ID_COLABORADOR, VISTO_QUALIDADE, TEXTO_QUALIDADE, PRIORIDADE_TAREFA, 0))                 
    conn.commit()
    cursor.close()
    fechar_conexao(conn)
    return jsonify({'mensagem': 'Tarefa aberta com sucesso'}), 200

@tarefa_bp.route('/<int:id_tarefa>', methods = {'PUT'})
def atualizar_tarefa(id_tarefa):
    data = request.get_json()
    OCORRENCIA_TAREFA = data['OCORRENCIA_TAREFA']
    DESCRICAO_TAREFA = data['DESCRICAO_TAREFA']
    DATA_TAREFA = data['DATA_TAREFA']
    TERMINO_TAREFA = data['TERMINO_TAREFA']
    CLASSIFICACAO_TAREFA = data['CLASSIFICACAO_TAREFA']
    PRIORIDADE_TAREFA = data['PRIORIDADE_TAREFA']
    MINUTOS_TAREFA = data['MINUTOS_TAREFA']
    ID_SETOR = data['ID_SETOR']
    ID_EQUIPAMENTO = data['ID_EQUIPAMENTO']
    ID_COLABORADOR = data['ID_COLABORADOR']
    TEXTO_QUALIDADE = data['TEXTO_QUALIDADE']
    VISTO_QUALIDADE = data['VISTO_QUALIDADE']
    ASSIST1 = data['ASSIST1']
    ASSIST1_MAIN = data['ASSIST1_MAIN']
    ASSIST2 = data['ASSIST2']
    ASSIST2_MAIN = data['ASSIST2_MAIN']
    ASSIST3 = data['ASSIST3']
    ASSIST3_MAIN = data['ASSIST3_MAIN']
    ASSIST4 = data['ASSIST4']
    ASSIST4_MAIN = data['ASSIST4_MAIN']
    print(f'1 {ASSIST1} main  {ASSIST1_MAIN}')
    print(f'2 {ASSIST2} main  {ASSIST2_MAIN}')
    print(f'3 {ASSIST3} main  {ASSIST3_MAIN}')
    print(f'4 {ASSIST4} main  {ASSIST4_MAIN}')
    conn = criar_conexao()
    cursor = conn.cursor()
    sql = 'UPDATE TAREFAS SET OCORRENCIA_TAREFA = %s, DESCRICAO_TAREFA = %s, DATA_TAREFA = %s, TERMINO_TAREFA = %s, CLASSIFICACAO_TAREFA = %s, PRIORIDADE_TAREFA = %s, MINUTOS_TAREFA = %s, ID_SETOR = %s, ID_EQUIPAMENTO = %s, ID_COLABORADOR = %s, TEXTO_QUALIDADE = %s, VISTO_QUALIDADE = %s WHERE ID_TAREFA = %s'
    valores = (OCORRENCIA_TAREFA, DESCRICAO_TAREFA, DATA_TAREFA, TERMINO_TAREFA, CLASSIFICACAO_TAREFA, PRIORIDADE_TAREFA, MINUTOS_TAREFA, ID_SETOR, ID_EQUIPAMENTO, ID_COLABORADOR, TEXTO_QUALIDADE, VISTO_QUALIDADE, id_tarefa)
    cursor.execute(sql, valores)
    if ASSIST1 == "Nulo":
        if ASSIST1_MAIN:
            cursor.execute("DELETE FROM COLABORADOR_TAREFA WHERE ID_TAREFA = %s AND ID_COLABORADOR = %s", (id_tarefa, ASSIST1_MAIN))
    if ASSIST2 == "Nulo":
        if ASSIST2_MAIN:
            cursor.execute("DELETE FROM COLABORADOR_TAREFA WHERE ID_TAREFA = %s AND ID_COLABORADOR = %s", (id_tarefa, ASSIST2_MAIN))
    if ASSIST1 == "Original":
        result = 0
    if ASSIST2 == "Original":
        result = 0
    if ASSIST1:
        if ASSIST1 != "Nulo":
            if ASSIST1 != "Original":
                if ASSIST1_MAIN:
                    cursor.execute("UPDATE COLABORADOR_TAREFA SET ID_COLABORADOR = %s WHERE ID_TAREFA = %s AND ID_COLABORADOR = %s", (ASSIST1, id_tarefa, ASSIST1_MAIN))
                else:
                    cursor.execute("INSERT INTO COLABORADOR_TAREFA (ID_TAREFA, ID_COLABORADOR) VALUES (%s, %s)", (id_tarefa, ASSIST1))
    if ASSIST2:
        if ASSIST2 != "Nulo":
            if ASSIST2 != "Original":
                if ASSIST2_MAIN:
                    cursor.execute("UPDATE COLABORADOR_TAREFA SET ID_COLABORADOR = %s WHERE ID_TAREFA = %s AND ID_COLABORADOR = %s", (ASSIST2, id_tarefa, ASSIST2_MAIN))
                else:
                    cursor.execute("INSERT INTO COLABORADOR_TAREFA (ID_TAREFA, ID_COLABORADOR) VALUES (%s, %s)", (id_tarefa, ASSIST2))

    if ASSIST3 == "Nulo":
        if ASSIST3_MAIN:
            cursor.execute("DELETE FROM COLABORADOR_TAREFA WHERE ID_TAREFA = %s AND ID_COLABORADOR = %s", (id_tarefa, ASSIST3_MAIN))
    if ASSIST4 == "Nulo":
        if ASSIST4_MAIN:
            cursor.execute("DELETE FROM COLABORADOR_TAREFA WHERE ID_TAREFA = %s AND ID_COLABORADOR = %s", (id_tarefa, ASSIST4_MAIN))
    if ASSIST3 == "Original":
        result = 0
    if ASSIST4 == "Original":
        result = 0
    if ASSIST3:
        if ASSIST3 != "Nulo":
            if ASSIST3 != "Original":
                if ASSIST3_MAIN:
                    cursor.execute("UPDATE COLABORADOR_TAREFA SET ID_COLABORADOR = %s WHERE ID_TAREFA = %s AND ID_COLABORADOR = %s", (ASSIST3, id_tarefa, ASSIST3_MAIN))
                else:
                    cursor.execute("INSERT INTO COLABORADOR_TAREFA (ID_TAREFA, ID_COLABORADOR) VALUES (%s, %s)", (id_tarefa, ASSIST3))
    if ASSIST4:
        if ASSIST4 != "Nulo":
            if ASSIST4 != "Original":
                if ASSIST4_MAIN:
                    cursor.execute("UPDATE COLABORADOR_TAREFA SET ID_COLABORADOR = %s WHERE ID_TAREFA = %s AND ID_COLABORADOR = %s", (ASSIST4, id_tarefa, ASSIST4_MAIN))
                else:
                    cursor.execute("INSERT INTO COLABORADOR_TAREFA (ID_TAREFA, ID_COLABORADOR) VALUES (%s, %s)", (id_tarefa, ASSIST4))
    conn.commit()
    cursor.close()
    fechar_conexao(conn)
    return jsonify({'mensagem': "Tarefa atualizada com sucesso"}), 200
    

@tarefa_bp.route('/concluir/<int:id_tarefa>', methods = {'PUT'})
def concluir_tarefa(id_tarefa):
    data = request.get_json()
    ID_COLABORADOR = data['ID_COLABORADOR']
    TERMINO_TAREFA = data['TERMINO_TAREFA']
    MINUTOS_TAREFA = data["MINUTOS_TAREFA"]
    DESCRICAO_TAREFA = data['DESCRICAO_TAREFA']
    ASSIST1 = data['ASSIST1']
    ASSIST2 = data['ASSIST2']
    ASSIST3 = data['ASSIST3']
    ASSIST4 = data['ASSIST4']
    conn = criar_conexao()
    cursor = conn.cursor()
    sql = 'UPDATE TAREFAS SET TERMINO_TAREFA = %s, ID_COLABORADOR = %s, MINUTOS_TAREFA = %s, DESCRICAO_TAREFA = %s, FINALIZADA_TAREFA = 1 WHERE ID_TAREFA = %s'
    valores = ( TERMINO_TAREFA, ID_COLABORADOR, MINUTOS_TAREFA, DESCRICAO_TAREFA, id_tarefa)
    cursor.execute(sql, valores)
    if ASSIST1 != "Nulo" and ASSIST1 != None:
        cursor.execute("INSERT INTO COLABORADOR_TAREFA (ID_TAREFA, ID_COLABORADOR) VALUES (%s, %s)", (id_tarefa, ASSIST1))
    if ASSIST2 != "Nulo" and ASSIST2 != None:
        cursor.execute("INSERT INTO COLABORADOR_TAREFA (ID_TAREFA, ID_COLABORADOR) VALUES (%s, %s)", (id_tarefa, ASSIST2))
    if ASSIST3 != "Nulo" and ASSIST3 != None:
        cursor.execute("INSERT INTO COLABORADOR_TAREFA (ID_TAREFA, ID_COLABORADOR) VALUES (%s, %s)", (id_tarefa, ASSIST3))
    if ASSIST4 != "Nulo" and ASSIST4 != None:
        cursor.execute("INSERT INTO COLABORADOR_TAREFA (ID_TAREFA, ID_COLABORADOR) VALUES (%s, %s)", (id_tarefa, ASSIST4))
    conn.commit()
    cursor.close()
    fechar_conexao(conn)
    return jsonify({'mensagem': "Tarefa atualizada com sucesso"}), 200

@tarefa_bp.route('/editarqualidade/<int:id_tarefa>', methods = {'PUT'})
def atualizar_tarefa_qualidade(id_tarefa):
    data = request.get_json()
    VISTO_QUALIDADE = data['VISTO_QUALIDADE']
    TEXTO_QUALIDADE = data['TEXTO_QUALIDADE']
    conn = criar_conexao()
    cursor = conn.cursor()
    sql = 'UPDATE TAREFAS SET VISTO_QUALIDADE = %s, TEXTO_QUALIDADE = %s WHERE ID_TAREFA = %s'
    valores = (VISTO_QUALIDADE,TEXTO_QUALIDADE, id_tarefa)
    cursor.execute(sql, valores)
    conn.commit()
    cursor.close()
    fechar_conexao(conn)
    return jsonify({'mensagem': "Tarefa atualizada com sucesso"}), 200

@tarefa_bp.route('/<int:id_tarefa>', methods = {'DELETE'})
def deletar_tarefa(id_tarefa):
    conn = criar_conexao()
    cursor = conn.cursor()
    sql = 'DELETE FROM TAREFAS WHERE ID_TAREFA = %s'
    valor = (id_tarefa, )
    try:
        cursor.execute(sql, valor)
        conn.commit()
        return jsonify({'mensagem': "Tarefa deletada com sucesso"}), 200
    except Exception as err:
        conn.rollback()
        return jsonify({'mensagem': f'Erro ao deletar a tarefa: {err}'}), 500
    finally:
        cursor.close()
        fechar_conexao(conn)