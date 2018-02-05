defmodule Calc do
  @moduledoc """
  Documentation for Calc.
  """

  @doc """

  ## Examples
  ## To run calc$ mix run -e Calc.main

  ## Enter the Expression 
  ## > 20 / 4
  ##    5
  ## Enter the Expression
  ## > 24 / 6 + (5 - 4)
  ##    5

  """
  
 #Given two number and a Operation this function 
 # returns the scalar value as a result of 
 # evaluatin of the expression 
 def evaluate_Expression(num1,num2,op) do
    _result = 0
    {iNum1,_} = Integer.parse(num1)
    {iNum2,_} = Integer.parse(num2)
    cond do
      op == "+" ->
         to_string(iNum1 + iNum2)
      op == "*" ->
         to_string(iNum1 * iNum2)
      op == "/" ->
         to_string(div(iNum1,iNum2))
      op == "-" ->
         to_string(iNum1 - iNum2)
    end
  end

# Evaluate everything in the parenthesis, Keep popping 
# untill you hit the opening the bracket
# This function called when the closing bracket is encountered
def evalParan(numStack,opeStack) do
    if(hd(opeStack) != "(") do      
      if((length numStack)!= 0)  do
        pop_Eval(numStack,hd(opeStack))
        |>(&evalParan(&1,tl(opeStack))).()
      end
    else 
      [numStack] ++ [tl(opeStack)]
    end
end


  # Takes the input string, Inserts space where parentheis are present 
  # and passes it to stack function for evaluation of the expression 
  
  def eval(expression) do 
      operand = []
      operation = []

      expression 
      |> (&Regex.replace(~r/\(/, &1 , "( ")).()
      |> (&Regex.replace(~r/\)/, &1 ," )")).()
      |> String.split()
      |> (&stack(&1,operand,operation)).()  
  end 


  # Once the expression is fully parsed, the stack has operation of 
  # higher precedence one below another, Then start popping one by one
  # and compute the final scalar value
  def compute_ScalarVal(opr,ope) do 
      if ((length ope) != 0) do 
          opr = pop_Eval(opr, hd(ope))
          compute_ScalarVal(opr,tl(ope))
      else
        String.to_integer(List.first(opr))
      end
  end


# This function is called when we have to pop and the two numbers from the 
# operand stack and evaluate the expression 
 def pop_Eval(oprStack, operation) do
    num2 = hd(oprStack)
    oprStack = tl(oprStack)
    num1 = hd(oprStack)
    [evaluate_Expression(num1,num2,operation)]++tl(oprStack)
 end

# While pushing to stack check precedence if higher then push if lower then 
# pop and evaluate the expression 
def check_Precedence(ele,ope,opr) do 
    cond do 
      ele == "(" ->
          [opr] ++ [[ele] ++ ope]

      ele == ")" ->
          [opr, ope] = evalParan(opr, ope)

      ele == "+" || ele == "-"->
          if (List.first(ope) == "(") do
              [opr] ++ [[ele] ++ ope]
          else
              operation = hd(ope)
              ope = tl(ope)
              opr = pop_Eval(opr, operation)
              [opr]++[[ele]++ope]
          end

      ele == "*" || ele == "/"->
          if (List.first(ope) == "-" || List.first(ope) == "+" || List.first(ope) == "(") do 
              [opr] ++ [[ele] ++ ope]
          else 
              operation = hd(ope)
              ope = tl(ope)
              opr = pop_Eval(opr, operation) 
              [opr]++[[ele]++ope]       
          end
    end
end

  # Parse the tokens in the expression one after another 
  # If number push to the operand stack 
  # If operation push to operation stack
  # Also while parsing try evaluating the expression on the go
  
  def stack(part, opr, ope) do   
    if ((length part) != 0) do # DO while length is more than 0 
      ele = List.first(part)   # Take the first element
      # Check if token is a number
      if (Regex.match?(~r/^-*[0-9]+$/,ele))do
         opr = [ele]++opr
         stack(tl(part),opr,ope)
      else
        # While pushing the operations check precedence if incoming is lower or eqaul 
        # pop and evaluate
        if ((length ope) == 0) do
          ope = [ele] ++ ope
          stack(tl(part),opr,ope)
        else
          [opr, ope] =check_Precedence(ele, ope, opr) 
          stack(tl(part),opr,ope)         
        end
      end
    else  
      compute_ScalarVal(opr,ope)
    end  
  end

  # Main function that takes the input from the user and passes it to eval function
  def main do
    IO.gets("Enter the Expression\n") # Enter the expression which needs to be eval
	  |>eval                                 
    |>IO.puts()

    main()
  end
end