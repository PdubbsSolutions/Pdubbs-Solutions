fromflask

 importflask


app =flask

(__name__)
@app.route('/')
def home():
    return "Welcome to the Homepage!"
if __name__ == "__main__":
    app.run(debug=True)
@app.route('/about')
def about():
        return "About Page"
@app.route('/contact')
def contact():
        return "Contact Page"
@app.route('/products')
def products():
        return "Products Page"
@app.route('/services')
def services():
        return "Services Page"

fromflask

_login import LoginManager
