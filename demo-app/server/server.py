from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "helo"

if '__main__' == __name__:
    app.run(debug=True)