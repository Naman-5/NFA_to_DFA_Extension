var finalTable;
class DFA{
    constructor(allStates,initial_state,final_state,input_symbols){
        this.allStates = allStates.split(",");
        this.refrence = allStates.split(",");
        this.initial_state = initial_state;
        this.final_state = final_state.split(",");
        this.input_symbols = input_symbols.split(",");
        this.transition_table = {};
        this.done = [];
        this.new = [];
    }

    setTable(){
        this.transition_table = finalTable;
        console.log("table set");
        console.log(this.transition_table);
    }

    computeTransition(state,type){
        
    }

    computeDFA(){
        let tableSection = document.getElementById("table-input");
        console.log("table");
        console.log(this.transition_table[this.allStates[0]]);
    }
    getTable(){
        let tableSection = document.getElementById("table-input");
        for(var i in this.allStates){
            let rule = {};
            for(var j in this.input_symbols){
                let message = "Enter the next state for "+this.allStates[i]+" when the input symbol is "+this.input_symbols[j]+": ";
                let transition = document.createElement('div');
                transition.style.marginLeft = '5%';
                let question = document.createElement('p');
                question.appendChild(document.createTextNode(message));
                question.style.color = "White";
                let input_transition = document.createElement('input');
                input_transition.placeholder = this.input_symbols[j];
                let done = document.createElement("button");
                done.appendChild(document.createTextNode("Save"));
                done.onclick = function(){
                    if(input_transition.value.trim()!=""){
                        rule[input_transition.placeholder] = input_transition.value;
                        transition.remove();
                    }
                }
                transition.appendChild(question);
                transition.appendChild(input_transition);
                transition.appendChild(done);
                tableSection.appendChild(transition);

            }
            this.transition_table[this.allStates[i]] = rule;
        }
        let computeButton = document.createElement('button');
        computeButton.append(document.createTextNode("Compute DFA"));
        computeButton.style.marginLeft = '42%';
        computeButton.onclick = function(){
            let dfa = new DFA(
                sessionStorage.getItem("allStates"), // all states
                sessionStorage.getItem('initialStates'), // initial state
                sessionStorage.getItem('finalStates'), // final states
                sessionStorage.getItem('inputSymbols') // input symbols
            )
            // the set table function uses the global variable finalTable
            // and sets the value for the class.
            dfa.setTable();
            // the computeDFA then further processes the input
            dfa.computeDFA();
        }
        tableSection.appendChild(computeButton);
        finalTable = this.transition_table;
    }
}

class DisplaySaved{
    display(){ 

        // refrencing the section to push text
        let display_section = document.getElementById('saved-input');

        // the data is retrieved from the session storage
        // and stored in th display_stats list for later user
        let display_stats = [];
        display_stats.push("Total No. of States :- "+ sessionStorage.getItem("noOfStates"));
        display_stats.push("States :- "+[... sessionStorage.getItem("allStates").split(",")].toString());
        display_stats.push("Initial State:- "+[... sessionStorage.getItem('initialStates').split(",")].toString());
        display_stats.push("Other States:- "+[... sessionStorage.getItem('otherStates').split(",")].toString());
        display_stats.push("Final States:- "+[... sessionStorage.getItem('finalStates').split(",")].toString());
        display_stats.push("Input Symbols:- "+[... sessionStorage.getItem('inputSymbols').split(",")].toString());

        // a new para element is created and all the values are then added to the para
        let para = document.createElement('p');
        para.style.marginLeft = '5%';
        para.style.color = "white";
        for(let i in display_stats){
            para.appendChild(document.createTextNode(display_stats[i]));
            para.appendChild(document.createElement('br'));
        }
        display_section.appendChild(para);
        let dfa = new DFA(
            sessionStorage.getItem("allStates"), // all states
            sessionStorage.getItem('initialStates'), // initial state
            sessionStorage.getItem('finalStates'), // final states
            sessionStorage.getItem('inputSymbols') // input symbols
        );
        dfa.getTable();
    }
}

let dis = new DisplaySaved
dis.display();