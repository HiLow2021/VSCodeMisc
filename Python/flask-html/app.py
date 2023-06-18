from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    name = "guest"

    return render_template('index.html', title='Hello Flask', name=name)