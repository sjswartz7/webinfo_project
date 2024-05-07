from flask import Flask,  render_template, request

print("running")

app = Flask(__name__)

@app.route("/")
def title():
    return render_template("homepage.html")

@app.route("/map")
def map():
    return render_template("map.html")

@app.route("/context")
def context():
    return render_template("context.html")

@app.route("/bio")
def bio():
    return render_template("bio.html")

@app.route("/timeline")
def timeline():
    return render_template("timeline.html")

@app.route("/title")
def books():
    return render_template("title.html")

@app.route("/search")
def search():
    return render_template("search.html")

app.debug = True

if __name__ == "__main__":
    app.run()



