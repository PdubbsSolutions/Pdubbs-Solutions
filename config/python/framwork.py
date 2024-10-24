fromflask

 importflask


app =flask

(__name__)
@app.route('/')
def home():
    return "Welcome to the Homepage"
if __name__ == "__main__":
    app.run(debug=True)