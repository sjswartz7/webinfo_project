from flask import Flask,  render_template, request

print("running")

app = Flask(__name__)

@app.route("/")
def ihomepage():
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

@app.route("/books")
def books():
    return render_template("books.html")

#if you need to add more pages, just copy the functions above, like this:
'''@app.route("/newpage")
    def newpage():
    return render_template("newpage.html")'''

app.debug = True

if __name__ == "__main__":
    app.run()



