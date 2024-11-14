from flask import Flask, jsonify, request
import braintree
import os

app = Flask('__name__')

gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        environment=braintree.Environment.Sandbox,
        merchant_id='my_merchant_id',
        public_key='my_public_key',
        private_key='my_private_key'
    )
)

@app.route('/create-braintree-token', methods=['GET'])
def create_braintree_token():
    client_token = gateway.client_token.generate()
    return jsonify({'clientToken': client_token})

@app.route('/process-braintree-payment', methods=['POST'])
def process_braintree_payment():
    data = request.get_json()
    nonce = data['payment_method_nonce']

    result = gateway.transaction.sale({
        "amount": data['amount'],
        "payment_method_nonce":nonce,
        "options":{
            "submit_for_settlement": True
        }
    })

    if result.is_success:
        return jsonify({'status': 'Payment successful', 'transaction_id': result.transaction.id})
    else:
        return jsonify({'error': result.message}), 400
    
