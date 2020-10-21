from flask import Flask, request, send_from_directory, jsonify
from os import path, listdir

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "helo"

@app.route('/words')
def get_available_words():
    d =  listdir('../../related-words')
    d.sort()
    return  jsonify([w.replace('.ml', '') for w in d])

@app.route('/ml/<string:word>')
def get_ml_word(word):
    with open(path.join('../../related-words', "{}.ml".format(word))) as f:
       return jsonify(f.read().split('\n'))


if '__main__' == __name__:
    app.run(debug=True)