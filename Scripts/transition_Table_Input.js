class GetTable{
    static getTable(){
        let tableSection = document.getElementById("table-input");
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
    }
}

let dis = new DisplaySaved
dis.display();