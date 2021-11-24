# The NFA to DFA conversion logic was first tested out in python 
# and then was implemented in javascript for the chrome extension

# The file has some minor issues with the output, which were 
# rectified during the JS implementation

class DFA:
    def __init__(self,allStates,initial_state,final_state,input_symbols):
        self.allStates = allStates.split(",")
        self.refrence = allStates.split(",")
        self.initial_state = initial_state.split(",")
        self.final_state = final_state.split(",")
        self.input_symbols = input_symbols.split(",")
        self.transition_table = {}
        self.done = []
        self.new = []

    def getTable(self):
        for i in self.allStates:
            rule = {}
            for j in self.input_symbols:
                message = "Enter the next state for "+i+" when input symbol is "+j+": "
                ele = input(message)
                rule[j] = ele
            self.transition_table[i] = rule
        print(self.transition_table)
    
    def __computeTransition(self,state,type):
        print("For state: ",state)
        if type=="i":
            for i in self.input_symbols:
                val = self.transition_table[state][i]
                print("For input symbol ",i,": ",val)
                if(val not in self.allStates):
                    self.new.append(val)
            self.done.append(state)
            self.allStates.remove(state)
        else:
            for i in self.input_symbols:
                try:
                    val = self.transition_table[state][i]
                    print("For input symbol ",i,": ",val)
                    if state in self.allStates:
                        self.allStates.remove(state)
                    elif state in self.new:
                        self.new.remove(state)
                    self.done.append(state)
                except:
                    val = state
                    calculate_val = ""
                    checkPlaces = val.split(";")
                    checkPlaces = [string for string in checkPlaces if string != ""]
                    for j in checkPlaces:
                        addingVal = self.transition_table[j][i]
                        if addingVal != '-':
                            calculate_val+=self.transition_table[j][i]+";"
                    print("For input symbol",i,": ",calculate_val)
                    if state in self.allStates:
                        self.allStates.remove(state)
                    elif state in self.new:
                        self.new.remove(state)
                    self.done.append(state)
                    if calculate_val not in self.done:
                        self.new.append(calculate_val)

            print(self.new)
            print(self.allStates)
       
    
    def computeDFA(self):
        print("----------RESULT----------")
        # starting with the initial state
        self.__computeTransition(self.initial_state[0],"i")
        while(len(self.new)>0 or len(self.allStates)>0):
            if len(self.new)!=0:
                if self.new[0] in self.done:
                    self.new.remove(self.new[0])
                else:
                    self.__computeTransition(self.new[0],"ni")
            elif len(self.allStates)!=0:
                if self.allStates[0] in self.done:
                    self.allStates.remove(self.allStates[0])
                else:
                    self.__computeTransition(self.allStates[0],"ni")
        



dfa = DFA("q0,q1,q2",'q0','q2','a,b')
dfa.getTable()
dfa.computeDFA()