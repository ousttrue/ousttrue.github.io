package.path = string.format("libs/?.lua;libs/?/init.lua;%s", package.path)

---@class Path
local Path = require "path"

local ICON_MAP = {
  file = "📄",
  directory = "📁",
}

---@param src Path
---@param dir Path
local function process(src, dir)
  print(src, dir)
  local stem, ext = src:get_stem_ext()
  if ext == "md" then
    local dst = (dir / stem).path .. ".html"
    print(string.format("%s => %s", src, dst))
  end
end

---@param src Path
---@param dst Path
local function main(src, dst)
  -- clear dst
  if dst:is_exists() then
    print("clear", dst)
    dst:rmdir()
  end

  src:traverse(
    ---@param file Path
    function(file)
      process(src:make_relative_path(file), dst)
    end
  )
end

main(Path.new "content", Path.new "public")
