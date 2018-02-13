defmodule Memory.Game do 


def new do
%{
  tiles: randomise_letters(), 
  count: 0,
  tileclickedId: 100,
  matchCount: 8,
  halt: 0, 
  clicks: 0,
}
end

  def client_view(game) do
   
   %{
        
        tiles: game[:tiles], 
        count: game.count,
        tileclickedId: game.tileclickedId,
        matchCount: game.matchCount,
        halt: game.halt,
        clicks: game.clicks,
   } 
  end

  def randomise_letters do
    letters = ~w(A B C D E F G H A B C D E F G H)
    mylist = Enum.shuffle(letters)
    list = [] 
    id = 0
    populateTile(mylist,list,id)
  end


  def populateTile(mylist,list,id_lis) do
      if((length mylist) !=0) do
        map = %{id: id_lis, key: hd(mylist), matched: false, clicked: false}
        list = list ++ [map]
        mylist = tl(mylist)
        populateTile(mylist,list,(id_lis + 1))
      else
        list
      end 
  end

  
  def reset() do
    new()
  end

  
  def after_delay(game) do 
      tiles = game[:tiles]
      newtile = []
      newtile = Enum.map(tiles, fn(x) -> 
              if x.matched == false do 
                     newtile ++ %{id: x.id, key: x.key, matched: x.matched, clicked: false}
              else 
                     newtile ++ x 
       end end)
      game = %{game | halt: 0}
      game = %{game | tileclickedId: 100}           
      game = Map.put(game, :tiles, newtile)
      game = %{game | count: 0}
  end


  def flip(game,id) do
      if(game.count == 0) do
          clickCount = game.clicks
          tiles = game[:tiles]
          newtile = []
          newtile = Enum.map(tiles, fn(x) -> 
              if x.id == id do 
                    newtile ++ %{id: x.id, key: x.key, matched: x.matched, clicked: true}
              else 
                    newtile ++ x 
                    end end)
          game = %{game | tileclickedId: id}           
          game = Map.put(game, :tiles, newtile)
          game = %{game | clicks: clickCount + 1}
          game = %{game | count: 1}
      else
          lastid = game.tileclickedId
          clickCount = game.clicks
          tiles = game[:tiles]
          prev = Enum.at(tiles,lastid)
          mcount = game.matchCount 
          pkey = prev[:key]
          pres = Enum.at(tiles, id)

          preskey = pres[:key]

          newtile = []
          newtile = Enum.map(tiles, fn(x) -> 
              if (x.id == id or x.id == lastid) do
                  if pkey == preskey do
                          newtile ++ %{id: x.id, key: x.key, matched: true, clicked: true}
                  else  
                          newtile ++ %{id: x.id, key: x.key, matched: x.matched, clicked: true}
                  end
              else 
                  newtile ++ x
              end end)
          if pkey == preskey do
            game = %{game | matchCount: mcount - 1}
          end
          game = Map.put(game, :tiles, newtile)
          game = %{game | clicks: clickCount + 1}
          game = %{game | halt: 1}
          game = %{game | count: 2}
      end
  end

end