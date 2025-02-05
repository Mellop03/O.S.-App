from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from rotas.rotas_admin import admin_bp
from rotas.rotas_setor import setor_bp
from rotas.rotas_tarefa import tarefa_bp
from rotas.rotas_colaborador import colaborador_bp
from rotas.rotas_equipamento import equipamento_bp

app = Flask(__name__)
CORS(app)
app.config['CORS-HEADER'] = 'Content-Type'

app.register_blueprint(admin_bp, url_prefix="/admin")
app.register_blueprint(setor_bp, url_prefix="/setor")
app.register_blueprint(tarefa_bp, url_prefix="/tarefa")
app.register_blueprint(equipamento_bp, url_prefix="/equipamento")
app.register_blueprint(colaborador_bp, url_prefix="/colaborador")

if __name__ == "__main__":
    app.run(host='192.168.69.187', port=5000, debug=True)