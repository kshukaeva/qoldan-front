import {CLIENT_ID} from '../../config'
import React, { useState, useEffect } from "react" ;
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Checkout = ({ createOrder, onApprove, onError }) => {

    return (
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <div>
                <br></br>

                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                />

            </div>
        </PayPalScriptProvider>
    );
}

export default Checkout;