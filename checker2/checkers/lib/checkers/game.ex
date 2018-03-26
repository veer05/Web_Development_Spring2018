defmodule Checkers.Game do
  
  #This function will assign the player to the game state
  def assignPlayerOne(game,playername) do
        %{game | player1: playername }
  end

  def assignPlayerTwo(game,playername) do
    %{game | player2: playername }
  end

  # create new instance of the game
	def new do
    %{  
       	pawns: %{"red" => createPlayerPawns("red"), 
       	         "black" => createPlayerPawns("black")},

       	previously_clicked: 100,
       	previous_player: "none",
        validSquares: %{},
        nextChance: "red",
        player1: "none",
        player2: "none",
        p1Score: 0,
        p2Score: 0,
        p1Won: false,
        p2Won: false,   
    }
	end

  #set the current game state
	def client_view(game) do
	IO.inspect("in client_view")   
   %{
        
        pawns: game[:pawns],
        previously_clicked: game.previously_clicked,
       	previous_player: game.previous_player,
        validSquares: game[:validSquares],
        nextChance: game.nextChance,
        player1: game.player1,
        player2: game.player2,
        p1Score: game.p1Score,
        p2Score: game.p2Score,
        p1Won: game.p1Won,
        p2Won: game.p2Won,
    } 
  	end

  #create red and black pawns and respective positions  
	def createPlayerPawns(color) do
	
		make_pawns=[]
    if(color == "red") do
    	new_array = [{0,1},{1,3},{2,5},{3,7},{4,8},{5,10},{6,12},{7,14},{8,17},{9,19},{10,21},{11,23}];
    else
      new_array = [{0,40},{1,42},{2,44},{3,46},{4,49},{5,51},{6,53},{7,55},{8,56},{9,58},{10,60},{11,62}];
    end
    	make_pawns = Enum.map(new_array, fn{k,v} -> 
  
 	 
  		make_pawns = make_pawns ++ %{id: k, player_color: color, position: v, defeated: false,king: false} 

  		 end)
	end

  def selectPawnToRemove(game,selectedPawn,remove_pawn,id) do   
    cond do
      id == selectedPawn.position + 14 ->
              rm_pawn = pawnToRemove(game,remove_pawn, id - 7)
      id == selectedPawn.position + 18 ->
              rm_pawn = pawnToRemove(game,remove_pawn, id - 9)
      id == selectedPawn.position - 14 ->
              rm_pawn = pawnToRemove(game,remove_pawn, id + 7)
      id == selectedPawn.position - 18 ->
              rm_pawn = pawnToRemove(game,remove_pawn, id + 9)
      true -> 
              rm_pawn = []
    end
  end

  #move pawn based on the valid positions obtained
  def movepawn(game,id,pawn_id,color) do
    p1wins = false
    p2wins = false
    pawns = game[:pawns]
    selectedPawns = pawns[color]
    selectedPawn = Enum.at(selectedPawns,pawn_id)
    if(color == "red") do
      remove_pawn = "black"
      tempId = 55
    else
      remove_pawn = "red"
      tempId = 8
    end
    removePawns = pawns[remove_pawn]

    rm_pawn = selectPawnToRemove(game,selectedPawn,remove_pawn,id)
    #move the selected pawn
    newSelectedPawns = []
    newSelectedPawns = Enum.map(selectedPawns, fn(x) -> 

      if(x.id == pawn_id ) do
        if((color =="red" and id > tempId) or (color == "black" and id<tempId)) do
          newSelectedPawns = newSelectedPawns ++ %{defeated: x.defeated, id: x.id, player_color: x.player_color, king: true, position: id}
        else
          newSelectedPawns = newSelectedPawns ++ %{defeated: x.defeated, id: x.id, player_color: x.player_color, king: x.king, position: id}
        end
      else
        newSelectedPawns = newSelectedPawns ++ x
    end end)

    #remove the pawns if jump happens
    newRemovePawns = []
    if((length rm_pawn) != 0) do
      pawn = Enum.at(rm_pawn,0)
      newRemovePawns = Enum.map(removePawns, fn(x) -> 
        if(x.id == pawn.id) do
          newRemovePawns = newRemovePawns ++ %{defeated: x.defeated, id: x.id, player_color: x.player_color, king: x.king, position: -100}
        else
          newRemovePawns = newRemovePawns ++ x
      end end)
      
      if pawn.player_color == "red" do
        score = game[:p2Score]
        score = score + 1
        game = %{game | p2Score: score }
      else
        score = game[:p1Score]
        score = score + 1
        game = %{game | p1Score: score }
      end

    else
      newRemovePawns = newRemovePawns ++ removePawns
    end
    
    if(color == "red") do
      newPawns = %{"red" => newSelectedPawns, "black" => newRemovePawns}
    else
      newPawns = %{"black" => newSelectedPawns, "red" => newRemovePawns}
    end

    game = Map.put(game, :pawns, newPawns)
    opponentMove = checkEndGame(game,newRemovePawns)
    currPlayerMove = checkEndGame(game,newSelectedPawns)
    
    opMoveLen = length opponentMove
    curMoveLen = length currPlayerMove
    
    if(color == "red") do
      if ((opMoveLen == 0) or (curMoveLen == 0)) do
        p1wins = getWinner(game,curMoveLen,newSelectedPawns,opMoveLen, newRemovePawns)
      end
    
    else
      if ((opMoveLen == 0) or (curMoveLen == 0)) do
        p2wins = getWinner(game,curMoveLen,newSelectedPawns,opMoveLen, newRemovePawns)
      end
    end
    
    if((p1wins == "draw") or (p2wins == "draw")) do
        p1wins = true
        p2wins = true
    end

    #set the game states with the updated values
    game = Map.put(game, :pawns, newPawns)
    game = %{game | previously_clicked: 100 }
    game = %{game | previous_player: 'none' }
    game = %{game | validSquares: %{}}
    game = %{game | p1Won: p1wins }
    game = %{game | p2Won: p2wins }
    if(color == "red") do
      game = %{game | nextChance: "black"}
    else
      game = %{game | nextChance: "red"}
    end
  end

  #Gets the winner in the present Scenario
  def getWinner(game,curMoveLen,newSelectedPawns,opMoveLen, newRemovePawns) do
      pwins = false
      cond do
          curMoveLen == opMoveLen ->
              pwins = tieBreaker(newSelectedPawns, newRemovePawns)
          curMoveLen > opMoveLen ->
              pwins = true
        true ->
              pwins = false
      end
  end

  #Get the count of king in case of breaking the tie
  def kingcount(newSelectedPawns) do
    kingcount = []
    kingcount = Enum.filter(newSelectedPawns, fn(x) -> x.king == true end)
  end

  #if in case of tie, check the king count for tie breaker
  def tieBreaker(newSelectedPawns,newRemovePawns) do
    p1KingCount = kingcount(newSelectedPawns)
    p2KingCount = kingcount(newRemovePawns)
    p1kinLen = length p2KingCount
    p2kinLen = length p1KingCount
    IO.inspect('Equal Case')
    pwins = false
    cond do 
         p1kinLen == p2kinLen ->
          pwins = "draw"
         p1kinLen > p2kinLen ->
          pwins = true
        true -> 
          pwins = false
    end
  end


  #Check if the game is to be ended
  def checkEndGame(game,pawnlist) do
      
      moves = []
      validmovelist = []
      validPawn = Enum.filter(pawnlist, fn(x) -> x.position != -100 
      end)

      if((length validPawn) >= 0) do
        moves = Enum.map(validPawn, fn(x) -> 
            moves = moves ++ getValPos(game,x.id,x.player_color)
        end)
      end
      validmovelist = Enum.filter(moves, fn(x) -> x != %{} end)
  end

  #remove the pawn selected for removal
  def pawnToRemove(game,remove_pawn, pos) do
    pawns = game[:pawns]
    removePawns = pawns[remove_pawn]

    Enum.filter(removePawns, fn(x) -> 
      x.position == pos 
    end)
  end


  #get next valid positions
  def getNextPos(game,id,color) do

    pawns = game[:pawns]
    pawnType = pawns[color]
    pawn = Enum.at(pawnType,id)
    makePawns=%{};
    dictmove1 = %{};
    dictmove2 = %{}; 
    #condition to check for king
    makePawns = getValPos(game,id,color)
    #set the current value for valid squares
    game = Map.put(game, :validSquares, makePawns)
    game = %{game | previously_clicked: id }
    game = %{game | previous_player: color }
  end


  #get next valid positions
  def getValPos(game,id,color) do

    pawns = game[:pawns]
    pawnType = pawns[color]
    pawn = Enum.at(pawnType,id)
    makePawns=%{};
    dictmove1 = %{};
    dictmove2 = %{}; 
    #condition to check for king
    cond do
      pawn.king == true ->
                    dictmove1 = getNextRedMove(game,pawn)
                    dictmove2 = getNextBlackMove(game,pawn)
                    makePawns = Map.merge(dictmove1,dictmove2)

      pawn.player_color == "red" ->
                    makePawns = getNextRedMove(game,pawn)
                    

      true ->
                    makePawns = getNextBlackMove(game,pawn)
    end
  end

  #get next position for black pawns when opponent is red
  def getBlackPlayer(newRedMap,newBlackMap,pos0,pos1,pawn) do

      validPos = %{}
      cond do
        newRedMap[pos0]!=nil ->
               pos0 = pawn.position + 14
               if((newRedMap[pos0]!=nil) or (newBlackMap[pos0]!=nil) or (rem(pos0 + 1, 8) == 0)) do
                pos0 = 100
               end 
        newBlackMap[pos0]!=nil ->
                pos0 = 100
        true ->
                pos0
      end
      cond do
        newRedMap[pos1]!=nil ->
               pos1 = pawn.position + 18
               if((newRedMap[pos1]!=nil) or (newBlackMap[pos1]!=nil) or (rem(pos1, 8) == 0)) do
                pos1 = 100
               end 
        newBlackMap[pos1]!=nil ->

                pos1 = 100
        true -> 
                pos1
      end 

      if pos0 < 64 do
        validPos = Map.merge(validPos, %{pos0 => true})
      end
      if pos1 < 64 do  
        validPos = Map.merge(validPos, %{pos1 => true})
      end
      validPos
  end

  #get red position when opponent is black
  def getRedPlayer(newRedMap,newBlackMap,pos0,pos1,pawn) do

      validPos = %{}
      cond do
        newBlackMap[pos0]!=nil ->
               pos0 = pawn.position + 14
               if((newRedMap[pos0]!=nil) or (newBlackMap[pos0]!=nil) or (rem(pos0 + 1, 8) == 0)) do
                pos0 = 100
               end 
        newRedMap[pos0]!=nil ->
                pos0 = 100
        true ->
                pos0
      end
      cond do
        newBlackMap[pos1]!=nil ->
               pos1 = pawn.position + 18
               if((newRedMap[pos1]!=nil) or (newBlackMap[pos1]!=nil) or (rem(pos1, 8) == 0)) do
                pos1 = 100
               end 
        newRedMap[pos1]!=nil ->

                pos1 = 100
        true -> 
                pos1
      end
      if pos0 < 64 do
        validPos = Map.merge(validPos, %{pos0 => true})
      end
      if pos1 < 64 do  
        validPos = Map.merge(validPos, %{pos1 => true})
      end 
      validPos
  end

  #get next position for the red
  def getNextRedMove(game,pawn) do

    dictmove = %{}
    makepawns=[]  
    pawns = game[:pawns]
    pos0 = pawn.position + 7
    pos1 = pawn.position + 9  
    redPawns = pawns["red"]
    blackPawns = pawns["black"]
    newRedMap = %{}
    newBlackMap = %{}

    newRedMap = Enum.reduce(redPawns, %{},fn(x,acc) ->  
      Map.put(acc, x.position, x)
    end)

    newBlackMap = Enum.reduce(blackPawns, %{},fn(x,acc) ->  
      Map.put(acc, x.position, x)
    end)

    if(rem(pawn.position, 8) == 0) do
        pos0 = 100;
    end
    if(rem(pawn.position+1, 8) == 0) do
        pos1 = 100;
    end
    if(pawn.player_color == "black") do   
        getBlackPlayer(newRedMap,newBlackMap,pos0,pos1,pawn)
    else   
        getRedPlayer(newRedMap,newBlackMap,pos0,pos1,pawn)
    end
  end

  #get next black position when opponent is red
  def getNextBlackMove(game,pawn) do

    dictmove = %{}
    makepawns=[]  
    pawns = game[:pawns]
    pos0 = pawn.position - 9
    pos1 = pawn.position - 7
    redPawns = pawns["red"]
    blackPawns = pawns["black"]
    newRedMap = %{}
    newBlackMap = %{}

    newRedMap = Enum.reduce(redPawns, %{},fn(x,acc) ->  
      Map.put(acc, x.position, x)
    end)

    newBlackMap = Enum.reduce(blackPawns, %{},fn(x,acc) ->  
      Map.put(acc, x.position, x)
    end)

    if(rem(pawn.position, 8) == 0) do
        pos0 = 100;
    end
    if(rem(pawn.position+1, 8) == 0) do
        pos1 = 100;
    end
    if(pawn.player_color == "black") do  
        getBlackPlayerPos(newRedMap,newBlackMap,pos0,pos1,pawn) 
    else       
        getRedPlayerPos(newRedMap,newBlackMap,pos0,pos1,pawn)
    end
  end

  #get next red player pos when opponent is black
  def getRedPlayerPos(newRedMap,newBlackMap,pos0,pos1,pawn) do

      validPos = %{}
      cond do
        newBlackMap[pos0]!=nil ->
               pos0 = pawn.position - 18
               if((newRedMap[pos0]!=nil) or (newBlackMap[pos0]!=nil) or (rem(pos0 + 1, 8) == 0)) do
                pos0 = 100
               end 
        newRedMap[pos0]!=nil ->
                pos0 = 100
        true -> 
                pos0
      end
      cond do
        newBlackMap[pos1]!=nil ->
               pos1 = pawn.position - 14
               if((newRedMap[pos1]!=nil) or (newBlackMap[pos1]!=nil) or (rem(pos1, 8) == 0)) do
                pos1 = 100
               end 
        newRedMap[pos1]!=nil ->
                pos1 = 100
        true ->
                pos1
      end 

      if pos0 < 64 do
        validPos = Map.merge(validPos, %{pos0 => true})
      end

      if pos1 < 64 do  
        validPos = Map.merge(validPos, %{pos1 => true})
      end 

      validPos
  end

  #get next black's pos when the oppenent is red
  def getBlackPlayerPos(newRedMap,newBlackMap,pos0,pos1,pawn) do

      validPos = %{}
      cond do
        newRedMap[pos0]!=nil ->
               pos0 = pawn.position - 18
               if((newRedMap[pos0]!=nil) or (newBlackMap[pos0]!=nil) or (rem(pos0 + 1, 8) == 0)) do
                pos0 = 100
               end 
        newBlackMap[pos0]!=nil ->
                pos0 = 100
        true ->
                pos0
      end
      cond do
        newRedMap[pos1]!=nil ->
               pos1 = pawn.position - 14
               if((newRedMap[pos1]!=nil) or (newBlackMap[pos1]!=nil) or (rem(pos1, 8) == 0)) do
                pos1 = 100
               end 
        newBlackMap[pos1]!=nil ->
                pos1 = 100
        true -> 
                pos1
      end 

      if pos0 < 64 do
        validPos = Map.merge(validPos, %{pos0 => true})
      end
      if pos1 < 64 do  
        validPos = Map.merge(validPos, %{pos1 => true})
      end

      validPos
  end

end