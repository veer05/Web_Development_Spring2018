defmodule CalcTest do
  use ExUnit.Case
  doctest Calc

  test "Simple two numers" do
    assert Calc.eval("1 + 3") == 4
  end

  test "Three numbers" do
    assert Calc.eval("1 + 2 * 3") == 7
  end

  test "Simple two numers with brackets" do
    assert Calc.eval("(1 + 2) * 3") == 9
  end

  test "BottleNose Example 3" do
    assert Calc.eval("24 / 6 + (5 - 4)") == 5
  end

  test "BottleNose Example 2" do
    assert Calc.eval("20 / 4") == 5
  end

  test "Bottlenose Example 1" do
    assert Calc.eval("5 * 1") == 5
  end

  test "Bottlenose Example 4" do
    assert Calc.eval("1 + 3 * 3 + 1") == 11
  end

  test "Complex Example " do
    assert Calc.eval("(1 + (2 * (3 + (4 * (5 + 6)))) + 3)") == 98
  end

  test "Precedence Check" do
    assert Calc.eval("1 * 2 * 3 * 4 + (1 + 2)") == 27
  end

  test "Multiplicatoin and Division" do
    assert Calc.eval("2 * 2 * 2 * 2 * 2 / 2 / 2 / 2 / 2 / 2") == 1
  end

  test "Precedence Check1" do
    assert Calc.eval("1 * 2 * 3 * 4 + (1 + 2)") == 27
  end
 
end
