---@type Path
local Path = require "path"

describe("Path test", function()
  it("relative path", function()
    do
      local base = Path.new "hoge"
      local child = base / "fuga"
      local rel = base:make_relative_path(child)
      --
      assert.same("fuga", rel.path)
    end

    do
      local base = Path.new "content"
      local target = Path.new "content/_templates/collection.html"
      local rel = base:make_relative_path(target)
      assert.same(rel.path, "_templates/collection.html")
    end
  end)
end)
