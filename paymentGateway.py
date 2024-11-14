
from requests import options
from flask import Flask, jsonify, request, redirect, url_for
import stripe
import paypalrestsdk
import braintree
import os

app = Flask(__name__)

@app.route('/')
def home():
   return "Hello, World!"

if __name__ == '__main__':
   app.run(debug=True)

stripe.api_key = 'pk_live_51QKiJADM5WSKq00Fvd47TBoq7AUCNzajwTJDrVd8NYc55cBdj2f6MQnQx2kN0xlWJSvOUiAzm8X6E8fjddxU8XOt00kncNz20o'

paypalrestsdk.configure({
   'mode': 'sandbox', #sandbox or live
   'client_id': 'AefN90YOQ27HHu08Okr8CiLc8HmzV-eEISMF71vPN_Uh0731Xwf0xj9Y4j0RtbP-MkoWBa4l8qJNiFrP',
   'client_secret': 'EK1-uitqwY_nhl3EKyDjhNyck7DU5aOm0MjrkiM9P2yoHk1b-7mrIaA9PWI0jytuUTQZYEG2WFgnmM0U'
})

@app.route('/create-stripe-payment-intent', methods=['POST'])
def create_stripe_payment_intent():
   try:
      data = request.get_json()
      amount = data['0.01']
      currency = data.get('currency', 'cad', 'usd')
      
      intent = stripe.PaymentIntent.create(
         amount=amount,
         currency=currency,
         payment_method_types=['card']
      )
      
      return jsonify({
         'clientSecret': intent['client_secret']
      })
   except Exception as e:
      return jsonify(error=str(e)),400

@app.route('/create_paypal_payment', methods=['POST'])
def create_paypal_payment():
    data = request.get_json()
    amount = data['amount']
    currency = data.get('currency', 'CAD')

    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://pdubbsolutions.ca/payment/execute",
            "cancel_url": "https://pdubbssolutions.ca/payment/cancel"
        },
        "transactions": [{
            "amount": {
                "total": f"{amount}",
                "currency": currency
            },
            "description": "Payment description"
        }]
    })

    if payment.create():
        approval_url = next(link['href'] for link in payment.links if link['rel'] == 'approval_url')
        return jsonify({"approval_url": approval_url}), 200
    else:
        return jsonify({"error": payment.error}), 400

@app.route('/execute-paypal-payment', methods=['GET'])
def execute_paypal_payment():
    payment_id = request.args.get('paymentId')
    payer_id = request.args.get('PayerID')
    payment = paypalrestsdk.Payment.find(payment_id)
    
    if payment.execute({"payer_id":payer_id}):
       return jsonify({'status': 'Payment completed successfully'})
    else:
       return jsonify(error=payment.error),400
    
@app.route('/cancel-paypal-payment',  methods=['GET'])
def cancel_paypal_payment():
   return jsonify({'status', 'Payment cancelled'})
if __name__ ==  '__main__':
   app.run(port=5000)

#braintree
gateway = braintree.BraintreeGateway(
   braintree.Configuration(
      environment=braintree.Environment.Sandbox, #switch to production
      public_key='ADD_PUBLIC_KEY',
      private_key='ADD_PRIVATE_KEY'
   )
)
