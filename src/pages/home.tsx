import React, {useRef} from "react";
import {firestore} from "../firebase"
import {addDoc, collection} from "@firebase/firestore";
import "./home.css";

export default function Home(){
    const messageRef = React.useRef<HTMLTextAreaElement>(null);
    const ref = collection(firestore,"messages");

    const handleSave = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if(messageRef!=null){
            console.log(messageRef.current?.value);
            let data = {
                message:messageRef.current?.value
            }
            try{
                addDoc(ref,data)
            }
            catch (e:any){
                console.log(e);
            }
        }
    }
    

    return(
        <div id="home_container">
            <form onSubmit={handleSave}>
                <h1>Hello there!</h1>
                <h2>How do you feel today?</h2>
                <textarea name="text!" rows={5} cols={80} ref={messageRef}/>
                <button id="submit_button" type="submit">submit message</button>
            </form>
        </div>

    );
}