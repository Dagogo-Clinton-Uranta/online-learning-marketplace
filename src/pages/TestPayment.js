import React from 'react'

const TestPayment = () => {
  return (
    <div>
        <h3>TestPayment</h3>

<form action="https://mapaycard.com/epay/" method="POST">
    <input type="hidden" name="c" value="MjcyMDQxNzM" />
    <input type="hidden" name="paycard-amount" value="10000" /> 
    <input type="hidden" name="paycard-description" value="Product sale" />
    <input type="hidden" name="paycard-callback-url" value="https://bonecole-student.netlify.app/dashboard/purchased-courses" />
    {/* <input type="hidden" name="paycard-callback-url" value="https://www.monsite.com/check_payment" /> */}
    <input type="hidden" name="paycard-redirect-with-get" value="on" />
    <input type="hidden" name="paycard-auto-redirect" value="off" /> 
    <input type="hidden" name="order_id" value="abc001" /> 
    <input type="image" src="https://mapaycard.com/static/images/paywithpaycard2.png" border="0" alt="Payez avec PayCard"></input>
    </form>
    </div>
  )
}

export default TestPayment