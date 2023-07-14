from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello Flask'

@app.route('/html')
def html():
    return render_template('index.html', title='Hello Flask', name='Guest')

@app.route('/json')
def json():
    return jsonify({ 'message' : 'Hello Flask'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)