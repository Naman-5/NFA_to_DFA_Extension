var finalTable; // global variable used to set the transition table in the DFA class
class DFA{
    constructor(allStates,initial_state,final_state,input_symbols){
        // these variables are used throughout the conversion logic
        this.allStates = allStates.split(",");
        this.refrence = allStates.split(",");
        this.initial_state = initial_state;
        this.final_state = final_state.split(",");
        this.input_symbols = input_symbols.split(",");
        this.transition_table = {};
        this.done = [];
        this.new = [];
        this.outputPara;
    }

    static deleteFromArray(arr,element){
        for(var i in arr){
            if(arr[i]===element)arr.splice(i,1);
        }
        return arr;
    }

    // the setTable function, gets the value from the global variable (finalTable)
    // the function also initialises the outputPara UI element 
    setTable(){
        this.transition_table = finalTable;
        this.outputPara = document.createElement('p');
    }

    // Computes the individual row of the tranisiton table
    computeTransition(state,type){
        // empty states are not required and cause problem with the computation
        // and therefore are dropped. 
        if(state=="" || state=="-"){
            this.allStates = DFA.deleteFromArray(this.allStates,"");
            this.new = DFA.deleteFromArray(this.new,state);
            return;
        }
        this.outputPara.appendChild(document.createTextNode("For state: "+state));
        this.outputPara.appendChild(document.createElement("br"));

        // The conversion computation begins from the initial state and therefore
        // initial state has a type -> i and has seperate logic from non-initial states
        if(type=="i"){
            for(var i in this.input_symbols){
                let val = this.transition_table[state][this.input_symbols[i]];
                this.outputPara.appendChild(document.createTextNode("For input Symbol "+this.input_symbols[i]+": "+val));
                this.outputPara.appendChild(document.createElement('br'));
                if(! this.refrence.includes(val)) this.new.push(val);
                this.done.push(state);
                this.allStates = DFA.deleteFromArray(this.allStates,state);
            }
        }
        else{
            // states with type ni (non-initial) are processed in the else flow control statement.
            for(var i in this.input_symbols){
                try{
                    let val = this.transition_table[state][this.input_symbols[i]];
                    this.outputPara.appendChild(document.createTextNode("For input Symbol "+this.input_symbols[i]+": "+val));
                    this.outputPara.appendChild(document.createElement('br'));
                    if(this.allStates.includes(state)) this.allStates = DFA.deleteFromArray(this.allStates,state); 
                    else if(this.new.includes(state)) this.new = DFA.deleteFromArray(this.new,state);
                    this.done.push(state);
                    if(! this.refrence.includes(val)) this.new.push(val);
                }
                catch(err){
                    let val = state;
                    let calculate_val = "";
                    let checkPlaces = val.split(";");
                    for(var j=0; j<checkPlaces.length;j++){
                        if(checkPlaces[j]=="") checkPlaces = DFA.deleteFromArray(checkPlaces,checkPlaces[j]);
                    }
                    for(var k=0; k<checkPlaces.length;k++){
                        try{
                        let addingVal = this.transition_table[checkPlaces[k]][this.input_symbols[i]];
                        if(addingVal!="-" && !(calculate_val.includes(addingVal))){ 
                            // repeated looping issue (fix here)
                            if(addingVal.includes(calculate_val)){
                                calculate_val = addingVal+";";
                            }
                            else calculate_val += this.transition_table[checkPlaces[k]][this.input_symbols[i]]+";"};
                       }catch(err){
                           alert("Incorrect Input Parameter");
                       }
                    }

                    // removing the extra semi-colon from the end
                    if(calculate_val[calculate_val.length - 1]===';'){
                        calculate_val = calculate_val.slice(0, -1); 
                    }
                    // once the computation is done, the result for the particular transition row is printed.
                    this.outputPara.appendChild(document.createTextNode("For input Symbol "+this.input_symbols[i]+": "+calculate_val));
                    this.outputPara.appendChild(document.createElement('br'));
                    if(this.allStates.includes(state)) this.allStates = DFA.deleteFromArray(this.allStates,state);
                    else if(this.new.includes(state)) this.new = DFA.deleteFromArray(this.new,state);
                    this.done.push(state);
                    if(! this.refrence.includes(calculate_val)) this.new.push(calculate_val);
                }
            }
        }
    }

    computeDFA(){
        // the computeDFA function uses a while loop to traverse through all the states 
        // the while loop calls the computeTransition function until all the states have been processed
        let tableSection = document.getElementById("table-input");
        this.outputPara.appendChild(document.createTextNode("----------RESULT----------"));
        this.outputPara.appendChild(document.createElement("br"));
        this.outputPara.appendChild(document.createElement('br'));
        // starting with the initial state and then moving to other
        // states as necessary (using elements in the done and new lists)
        this.computeTransition(this.initial_state,"i");
        while(this.new.length>0 || this.allStates.length>0){
            // the new list contains names of the states that are newly formed and were no a part of the NFA
            if(this.new.length >0 ){
                if(this.done.includes(this.new[0])) this.new = DFA.deleteFromArray(this.new,this.new[0]);
                else this.computeTransition(this.new[0],"ni");
            }
            // the remaining states are processed
            else if(this.allStates.length > 0){
                if(this.done.includes(this.allStates[0] )) this.allStates = DFA.deleteFromArray(this.allStates,this.allStates[0]); 
                else   this.computeTransition(this.allStates[0],"ni");
            }
        }

        // once the computation is done the output para is appended to the UI for the user
        this.outputPara.style.color = "white";
        this.outputPara.style.marginLeft = "5%";
        this.outputPara.style.fontStyle = 'italic';
        this.outputPara.style.fontSize = '14px';
        tableSection.appendChild(this.outputPara);
        let disclaimerMessage = "All states conataining final state will also be final. Kindly remove the ';' from the output DFA transition table when drawing the diagram for the DFA";
        let disclaimer = document.createElement('p');
        disclaimer.style.color = 'white';
        disclaimer.style.marginLeft = "5%";
        disclaimer.appendChild(document.createTextNode(disclaimerMessage));
        tableSection.appendChild(disclaimer);
    }
    // the getTable function creates the required input boxes for the user to save his responses.
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
        computeButton.style.background = '#32CD32';
        computeButton.style.color = 'white';
        computeButton.style.borderRadius = '10px';
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
            computeButton.remove();
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
        para.style.fontSize ='14px';
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