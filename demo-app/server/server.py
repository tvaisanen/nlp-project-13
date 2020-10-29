from flask import Flask, jsonify
import csv

app = Flask(__name__)

@app.route('/data/stss131/sentences')
def sentences():
    with open('data/stss.csv', 'r') as file:
        return jsonify([ 
            (p[1], p[2], float(p[3])) for p in [
            line.replace('\n', '').split(';') for 
            line in 
            file
        ]]) 


@app.route('/data/stss131/similarity')
def foo():
    with open('data/similarity_scores.csv', 'r') as file:
        file_data = [
            line.replace('\n', '').split(',') for 
            line in 
            file]
        return jsonify(dict(
            labels=file_data[0],
            data=file_data[1:]
        ))


if '__main__' == __name__:
    app.run(debug=True)