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

    getTable(){
        let tableSection = document.getElementById("table-input");
        for(var i in this.allStates){
            rule = {};
            for(var j in this.input_symbols){
                message = "Enter the next state for "+this.allStates[i]+" when the input symbol is "+this.input_symbols[j]+": ";
                // continue from here
                // get the transition table data from user
            }
        }
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