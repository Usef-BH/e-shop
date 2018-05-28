import React from 'react';

import styles from '../css/cart.css';

const SHIPPING_OPTIONS = {
    us: [
        {
            id: 'standard',
            label: 'Standard Shipping',
            price: 0
        },
        {
            id: 'express',
            label: 'Express Shipping',
            price: 10
        }
    ],
    international: [
        {
            id: 'international',
            label: 'International Shipping',
            price: 15
        }
    ]
};

export default class Cart extends React.Component {

    removeItem(id) {
        this.props.store.dispatch({ type: 'REMOVE_ITEM', id });
        document.activeElement.blur();
        document.activeElement.focus();
    }

    onBuyClicked(cart) {
        if (!window.PaymentRequest) {
            // PaymentRequest API is not available. Forwarding to
            // legacy form based experience.
            location.href = '/checkout';
            return;
        }

        // Supported payment methods
        const supportedInstruments = [{
            supportedMethods: ['basic-card'],
            data: {
                supportedNetworks: [
                    'visa', 'mastercard', 'amex', 'discover',
                    'diners', 'jcb', 'unionpay'
                ]
            }
        }];


        // Payment options
        const paymentOptions = {
            // TODO PAY-7.1 - allow shipping options
            requestShipping: true,
            // TODO PAY-9 - Add payment options
            requestPayerEmail: true,
            requestPayerPhone: true,
            requestPayerName: true
        };

        let shippingOptions = [];
        let selectedOption = null;

        let details = this.buildPaymentDetails(cart, shippingOptions, selectedOption);

        // 1. Create a `PaymentRequest` instance
        const request = new PaymentRequest(supportedInstruments, details, paymentOptions);

        request.addEventListener('shippingaddresschange', e => {
            e.updateWith((_ => {
                shippingOptions = this.optionsForCountry(request.shippingAddress.country);
                selectedOption = shippingOptions[0].id;
                let details = this.buildPaymentDetails(cart, shippingOptions, selectedOption);
                return Promise.resolve(details);
            })());
        });

        request.addEventListener('shippingoptionchange', e => {
            e.updateWith((_ => {
                selectedOption = request.shippingOption;
                let details = this.buildPaymentDetails(cart, shippingOptions, selectedOption);
                return Promise.resolve(details);
            })());
        });

        // 2. Show the native UI with `.show()`
        return request.show()
            .then(r => {
                // The UI will show a spinner to the user until
                // `request.complete()` is called.
                let response = r;
                let data = r.toJSON();
                setTimeout( () => {
                    response.complete();
                    this.createModal();
                    this.props.store.dispatch({ type: 'REMOVE_ALL'});
                    console.log(data);
                }, 2000);
            });
        // 3. Process the payment
        /*    .then(result => {
                // POST the payment information to the server
                return fetch('/pay', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(result.toJSON())
                }).then(response => {
                    // 4. Display payment results
                    if (response.status === 200) {
                        // Payment successful
                        return result.complete('success');
                    } else {
                        // Payment failure
                        return result.complete('fail');
                    }
                }).catch(() => {
                    return result.complete('fail');
                });
            });*/
    }

    createModal() {
        let template = `<div class="over" tabindex="-1">
            <div class="modal modal-success" role="dialog" aria-modal="true">   
                <div class="swal-icon swal-icon--success">
                    <span class="swal-icon--success__line swal-icon--success__line--long"></span>
                    <span class="swal-icon--success__line swal-icon--success__line--tip"></span>
                    <div class="swal-icon--success__ring"></div>
                    <div class="swal-icon--success__hide-corners"></div>
                </div>        
                <span class="greetings">
                    Thank you for your purchase. See you soon!
                </span>
                <button class="ok success">OK</button>
            </div>
        </div>`
        
        document.body.insertAdjacentHTML('beforeend', template);
        document.querySelector('.modal').addEventListener("click", (e) => {
            e.stopPropagation();
        })
        document.body.classList.toggle("noscroll");
        document.querySelector('.over').addEventListener('click', () => {
            let overlay = document.querySelector('.over')
            document.body.removeChild(overlay);
            document.body.classList.toggle("noscroll");
        });
        document.querySelector('.ok').addEventListener('click', () => {
            let overlay = document.querySelector('.over')
            document.body.removeChild(overlay);
            document.body.classList.toggle("noscroll");
        });
    }

    /*
    * Creates the PaymentDetails dictionary inside the PaymentRequest.
    * This can change as the user selects shipping options.
    */
    buildPaymentDetails(cart, shippingOptions, shippingOptionId) {

        let displayItems = cart.items.map(item => {
            return {
                label: item.title,
                amount: { currency: 'USD', value: String(item.price * item.quantity) }
            }
        })

        let total = cart.total;

        // TODO PAY-7.3 - allow shipping options
        let displayedShippingOptions = [];
        if (shippingOptions.length > 0) {
            let selectedOption = shippingOptions.find(option => {
                return option.id === shippingOptionId;
            });
            displayedShippingOptions = shippingOptions.map(option => {
                return {
                    id: option.id,
                    label: option.label,
                    amount: { currency: 'USD', value: String(option.price) },
                    selected: option.id === shippingOptionId
                };
            });
            if (selectedOption) {
                total += selectedOption.price;
            }
        }

        let details = {
            displayItems: displayItems,
            total: {
                label: 'Total due',
                amount: { currency: 'USD', value: String(total) }
            },
            // TODO PAY-7.2 - allow shipping options
            shippingOptions: displayedShippingOptions
        };

        return details;
    }

    optionsForCountry(country) {
        country = country.toLowerCase();
        if (!country || !SHIPPING_OPTIONS.hasOwnProperty(country)) {
            country = 'international';
        }
        let options = SHIPPING_OPTIONS[country];
        // Sort by price, lowest first
        options.sort((a, b) => {
            return a.price - b.price;
        });
        return options;
    }


    render() {
        let { store } = this.props;
        console.log("store.getState: ", store.getState());
        let total = store.getState().reduce((accum, curr) => accum + curr.price * curr.quantity, 0);
        let cart = {
            total,
            items: store.getState(),
        }
        /*
        state = [
            {
                id: id,
                title: title,
                price; price,
                quantity: quantity
            }
        ]
        */

        return (
            <div className={styles.cart_container}>
                <h1 className={styles.cat_title}>Cart</h1>
                <table className={styles.cart_table}>
                    <thead>
                        <tr className={styles.list_item}>
                            <th>Title</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.getState().map((item, index) => (
                            <tr key={index} className={styles.list_item}>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>{item.quantity * item.price}$</td>
                                <td>
                                    <button className="fontawesome-trash" role="Remove item from cart"
                                        onClick={() => this.removeItem(item.id)} ></button>
                                </td>
                            </tr>)
                        )}
                        <tr className={styles.list_total}>
                            <th></th>
                            <th>Total</th>
                            <th>{total}</th>
                            <th></th>
                        </tr>
                    </tbody>
                </table>
                <div className={styles.checkout}>
                    <button onClick={() => this.onBuyClicked(cart)}
                        className={styles.checkout_button} disabled={total > 0 ? false : true}>Checkout</button>
                </div>
            </div>
        )
    }
}