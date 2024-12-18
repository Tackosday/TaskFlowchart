from flask import Flask
from flask_cors import CORS
from database import URL

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": URL}})

@app.route('/api/data', methods=['GET'])
def data():
    return {"message": "CORS habilitado"}

if __name__ == "__main__":
    app.run(debug=True)