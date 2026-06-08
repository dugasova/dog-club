import { createContext, useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, type User, type UserCredential } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface UserAuthContextType {
    user: User | null;
    signUp: (email: string, password: string) => Promise<UserCredential>;
    logIn: (email: string, password: string) => Promise<UserCredential>;
    logOut: () => Promise<void>;
}

const AuthContext = createContext<UserAuthContextType | null>(null);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    function signUp(email: string, password: string) {
       return createUserWithEmailAndPassword(auth, email, password).then((credential) => {
        setDoc(doc(db, 'users', email), {
            savedFoods: []
        })
        return credential
       })
    }
    function logIn(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function logOut() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={{ signUp, user, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('UserAuth must be used within an AuthContextProvider');
    }
    return context;
}