# app/routes.py
fromflask

 importflask


from app.python.app_flask
 import Blueprint, render_template, request, redirect, url_for, flash, session

app =flask

(__name__)

main_bp = Blueprint('main', __name__)

@app.route('/')
def dashboard():
    return render_template('dashboard.html')
@app.route('/services')
def services():
    return render_template('services.html')
@app.route('/requests')
def requests():
    return render_template('requests.html')
@app.route('/login')
def login():
    return render_template('login.ejs')
@app.route('/register')
def register():
    return render_template('register.html')
@app.route('/templates')
def templates():
    return render_template('templates.html')
@app.route('/checkout', methods=['GET', 'POST'])
def checkout():
    if request.method == 'POST':
        customer_name = request.form['name']
        customer_email = request.form['email']
        customer_phone_number = request.form['phone_number']
        address = request.form['address']
        payment_method = request.form['payment_method']
        flash('Your order has been placed successfully!', 'success')
    return redirect('\dashboard.html')
    return render_template('checkout.html')
@app.route('/products')
def products():
    return render_template('products.html')
@app.route('/cart')
def cart():
    cart_items = session.get('cart, []')
    return render_template('cart.html', cart_items=cart_items)
@app.route('/add_to_cart/<int:item_id>')
def add_to_cart(item_id):
    cart = session.get('cart',[])
    cart.append(item_id)
    session['cart'] = cart
    flash('Item has been added to your cart!', 'success')
    return redirect('\cart.html')
@app.route('/termsandAgreements')
def termsandAgreements():
    return render_template('termsandAgreements.html')
@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')
@app.route('/about')
def about():
    return render_template('about.html')
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method =='POST':
        name = request.form['name']
        email = request.form['email']
        business_size = request.form['business_size']
        number_of_employees = request.form['number_of_employees']
        priority_of_service_request = request.form['priority_of_service_request']
        other_details = request.form['other_details']
        flash('Your message has been sent successfully!', 'success')
        return redirect('\dashboard.html')
    return render_template('contact.html')
@app.route('/accessibility')
def accessibility():
    return render_template('sources.html')
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404
if __name__ == '__main__':
    app.run(debug=True)
fromflask

 import Blueprint,flask

, render_template, request, redirect, url_for, flash, session

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return render_template('dashboard.html')

# Other routes...
