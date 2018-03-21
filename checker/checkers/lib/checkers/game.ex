defmodule Checkers.Game do


	def new do
	IO.inspect("oin new")
    %{
       
       	pawns: %{:red => createPlayerPawns("red"), 
       	         :black => createPlayerPawns("black")},

       	previously_clicked: 100,
       	previous_player: "none",

    }
	end


	def client_view(game) do
	IO.inspect("in client_view")   
   %{
        
        pawns: game[:pawns],
        previously_clicked: game.previously_clicked,
       	previous_player: game.previous_player,
    } 
  	end

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

end