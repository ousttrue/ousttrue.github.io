---@param path string
local function add_lua_path(path)
  package.path =
    string.format("%s/?.lua;%s/?/init.lua;%s", path, path, package.path)
end
add_lua_path "libs"
add_lua_path "lua_modules/share/lua/5.1"

local yaml = require "tinyyaml"

describe("tinyyaml", function()
  it("date", function()
    yaml.parse [[date: 2019-08-17]]
  end)
end)
