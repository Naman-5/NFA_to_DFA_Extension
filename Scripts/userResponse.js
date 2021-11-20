class Verify{
    static verifyResponse(){
        let response = false;
        try {
            // getting saved values from session storage
            let noOfStates = sessionStorage.getItem("noOfStates");
            let allStates = sessionStorage.getItem("allStates").split(",");
            let initial_states = sessionStorage.getItem('initialStates').split(',');
            let final_states = sessionStorage.getItem('finalStates').split(',');

            let eliminate = [...initial_states, ...final_states];
            let filteredArray = [];
            for(var i=0;i<noOfStates;i++){
                let current = allStates[i];
                let found = false;
                for(var j=0;j<eliminate.length;j++){
                    if(current==eliminate[j]){
                        found=true;
                        break;
                    }
                }
                if(!found){
                    filteredArray.push(current);
                }
            }
            sessionStorage.setItem("otherStates",filteredArray);
            // verifying response correctness
            if (noOfStates != allStates.length) {
                alert("Kindly check the values and enter again");
            }
            else if ((initial_states.length+final_states.length+filteredArray.length)!= noOfStates) {
              alert("Kindly check the values and enter again");
            }
            else {
            alert("Input Saved");
            response = true;
          }
        } catch (err) {
          alert("Kindly fill all the input boxes");
        }
        return response;
    }
}

class Response{

    collectResponse(){
        alert("hi");
    }
    initialResponseForm(){
        sessionStorage.clear();
        let inputSection = document.getElementById("user-input");
        let form = document.createElement("form");

        // no of states input
        let statesp = document.createElement("p");
        let statesText = document.createElement("h4");
        statesText.style.marginLeft = "2%";
        statesText.style.fontSize = "14.5px";
        statesText.appendChild(document.createTextNode("The number of states in the NFA? "));
        let states = document.createElement("input");
        states.type = "number";
        states.value = 0;
        states.style.color = "white";
        statesp.appendChild(statesText);
        statesp.appendChild(states);

        // names of all the states
        let stateNamesp = document.createElement("p");
        let statesNameText = document.createElement("h4");
        statesNameText.style.marginLeft = "2%";
        statesNameText.appendChild(document.createTextNode("Enter the names for all the states (seperated by ,) :"));
        statesNameText.style.fontSize = "14.5px";
        let stateNames = document.createElement("input");
        stateNames.type = "text";
        stateNames.style.color = "white";
        stateNamesp.appendChild(statesNameText);
        stateNamesp.appendChild(stateNames);

        // names of the initial states
        let initialStatesp = document.createElement("p");
        let initialStatesText = document.createElement("h4");
        initialStatesText.style.marginLeft = "2%";
        initialStatesText.appendChild(document.createTextNode("Enter the names of the initial state (seperated by ,) :"));
        initialStatesText.style.fontSize = "14.5px";
        let initialStates = document.createElement("input");
        initialStates.style.color = "white";
        initialStatesp.appendChild(initialStatesText);
        initialStatesp.appendChild(initialStates);

        // names of the final states
        let finalStatesp = document.createElement("p");
        let finalStatesText = document.createElement("h4");
        finalStatesText.style.marginLeft = "2%";
        finalStatesText.appendChild(document.createTextNode("Enter the names of the final state (seperated by ,) :"));
        finalStatesText.style.fontSize = "14.5px";
        let finalStates = document.createElement("input");
        finalStates.style.color = "white";
        finalStatesp.appendChild(finalStatesText);
        finalStatesp.appendChild(finalStates);

        // input symbols
        let inputp = document.createElement("p");
        let inputText = document.createElement("h4");
        inputText.style.marginLeft = "2%";
        inputText.appendChild(document.createTextNode("Enter the input symbols (seperated by ,) :"));
        inputText.style.fontSize = "14.5px";
        let inputSymbols = document.createElement("input");
        inputSymbols.style.color = "white";
        inputp.appendChild(inputText);
        inputp.appendChild(inputSymbols);

        // submit button
        let submitp = document.createElement("p");
        let submit = document.createElement("button");
        // submit.setAttribute("type","submit");
        submit.style.marginLeft = "42%";
        submit.appendChild(document.createTextNode("Submit"));
        submit.onclick = function(){
            // collecting number of states and verifying the input
            sessionStorage.setItem("noOfStates", states.value);
            sessionStorage.setItem("allStates", stateNames.value);
            sessionStorage.setItem("initialStates", initialStates.value);
            sessionStorage.setItem("finalStates", finalStates.value);
            sessionStorage.setItem("inputSymbols", inputSymbols.value);

            //verifying inputs
            let response  = Verify.verifyResponse();
            if(response){
                form.remove();
                window.location.replace('../newPage.html');
            }

        }
        submitp.appendChild(submit);


        form.appendChild(statesp);
        form.appendChild(stateNamesp);
        form.appendChild(initialStatesp);
        form.appendChild(finalStatesp);
        form.appendChild(inputp);
        form.appendChild(submitp);

        inputSection.appendChild(form);
    }
}

response = new Response();
response.initialResponseForm();