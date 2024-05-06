from flask import Flask,  render_template, request

print("running")

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("testindex.html")

@app.route("/map")
def map():
    return render_template("map.html")


@app.route("/context")
def context():
    return render_template("context.html")

app.debug = True

if __name__ == "__main__":
    app.run()



