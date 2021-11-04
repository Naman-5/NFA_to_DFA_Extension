class GetInputs {
    clearBox(parent){
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
  single_response_questions(question,result_type,location_to_put,storage_key,unacceptable_value) {
    /*
        ---------------Input Parameters for the function-----------------
        question -> text, containing the question statement
        result_type -> defines the type of input box to use (numbers or text)
        location_to_put -> provides us the element where to insert the questions
        storage_key -> provides the key value that is used to save the user response in session storage
        unacceptable_value -> provides us values that may result in function error
         */

    let unit = document.createElement("div");
    // generating user hint
    let question_container = document.createElement("h5");
    question_container.appendChild(document.createTextNode(question));
    // question_container.className = "question";
    unit.appendChild(question_container);

    //add response section
    let user_response = document.createElement("input");
    user_response.type = result_type;
    user_response.className = "question";
    if (result_type == "number") user_response.value = 0;
    unit.appendChild(user_response);

    // add confirmation buttion
    let done = document.createElement("button");
    done.appendChild(document.createTextNode("Done"));
    done.style.backgroundColor = "#9DCC5F";
    done.style.borderRadius = '10px';
    done.style.color = "white";
    done.onclick = function () {
      if (user_response.value == unacceptable_value) {
        alert("Value error, the provided input is not acceptable");
      } else {
        sessionStorage.setItem(storage_key, user_response.value);
        unit.remove();
      }
    };
    unit.appendChild(done);
    // adding the question unit to requested location
    location_to_put.appendChild(unit);
  }

  userInput() {
    let inputSection = document.getElementById("user-input");

    // getting the number of states in the NFA
    this.single_response_questions("Enter the number of states in the NFA :","number",inputSection,"noOfStates",0);
    // getting the states from the user
    this.single_response_questions("Enter the names for all the states (seperated by ,) :","text",inputSection,"allStates","");
    // getting the initial states from the user
    this.single_response_questions("Enter the names of the initial state (seperated by ,) :","text",inputSection,"initialStates","");
    // getting the final states from the user
    this.single_response_questions("Enter the names of the final state (sperated by ,) :","text",inputSection,"finalStates","");
    // getting the input symbols from the user
    this.single_response_questions("Enter the input symbols (seperated by ,) :","text",inputSection,"inputSymbols","");

    // creating input verification button
    let verify = document.createElement("button");
    verify.appendChild(document.createTextNode("Verify Input"));
    verify.style.marginLeft = "50%";
    verify.style.backgroundColor = "#9DCC5F";
    verify.style.borderRadius = "15px";
    verify.style.fontSize = "18px";
    verify.style.color = "white";
    verify.onclick = function () {
      try {
          // getting saved values from session storage
          let noOfStates = sessionStorage.getItem("noOfStates");
          let allStates = sessionStorage.getItem("allStates").split(",");
          let initial_states = sessionStorage.getItem('initialStates').split(',');
          let final_states = sessionStorage.getItem('finalStates').split(',');
          
          if (noOfStates != allStates.length) {verify.remove();alert("Kindly check the values and enter again");g = new GetInputs; g.clearBox(inputSection);g.userInput();}
          else if ((initial_states.length+final_states.length)!= noOfStates) {verify.remove();alert("Kindly check the values and enter again");g = new GetInputs;g.clearBox(inputSection); g.userInput();}
          else {
          alert("Input Saved");
          verify.remove();
        }
      } catch (err) {
        alert("Kindly fill all the input boxes");
      }
    };
    inputSection.appendChild(verify);
  }
}

g = new GetInputs();
g.userInput();
// g.inputVerification();
