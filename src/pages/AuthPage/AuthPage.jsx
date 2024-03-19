import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LogInForm from "../../components/LogInForm/LogInForm";

function AuthPage({ setUser }) {
    const [showSignup, setShowSignup] = useState(false);

    return (
        <main>
            <h1>Hello 👋</h1>
            { showSignup ?
            <SignUpForm setUser={ setUser } showSignup={ showSignup } setShowSignup={ setShowSignup} />
            :
            <LogInForm setUser={ setUser } showSignup={ showSignup } setShowSignup={ setShowSignup } />
        }
        </main>
    )
};

export default AuthPage;