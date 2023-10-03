import { Link } from 'react-router-dom'

export default function About(){
    return(
        <div className="about">
            <h2>About</h2>
            <p>
                Welcome to <Link to='https://github.com/esteriella/wallet-system'>Estie Wallet System!</Link> We're excited to have you explore and test our wallet management system. We recommend using dummy information when testing out the application.
            </p>
            <h2>Disclaimer</h2>
            <p><strong>This is Not a Real Wallet</strong></p>
            <p>Estie Wallet System is a web application created for testing and educational purposes only. It is <strong>not a real financial institution</strong>, and the funds, transactions, and information used within this system are entirely simulated. Any actions taken in this application have no real-world financial consequences.
            </p>
        </div>
    )
}