import LoggedOutNavbar from "./LoggedOutNavbar";
import "./Css/Faq.css";

function FAQ(){
  
    return(
        <>
        <LoggedOutNavbar />
           <div class="faq-header">Frequently Asked Questions</div>

<div class="faq-content">
  <div class="faq-question">
    <input id="q1" type="checkbox" class="panel"></input>
    <div class="plus">+</div>
    <label for="q1" class="panel-title">Do i need an account?</label>
    <div class="panel-content">No</div>
  </div>
  
  <div class="faq-question">
    <input id="q2" type="checkbox" class="panel"></input>
    <div class="plus">+</div>
    <label for="q2" class="panel-title">What does this do</label>
    <div class="panel-content">stuff</div>
  </div>
  
  <div class="faq-question">
    <input id="q3" type="checkbox" class="panel"></input>
    <div class="plus">+</div>
    <label for="q3" class="panel-title">How are the prices calculated</label>
    <div class="panel-content">Using database found</div>
  </div>
</div>
        </>
    );
}

export default FAQ