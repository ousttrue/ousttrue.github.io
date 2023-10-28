package.cpath = string.format("%s;%s", "./lua_modules/lib/lua/5.1/?.so", package.cpath)

---@class uv
local uv = require "luv"

-- https://stackoverflow.com/questions/9790688/escaping-strings-for-gsub
local function quotepattern(str)
  local pat = "([" .. ("%^$().[]*+-?"):gsub("(.)", "%%%1") .. "])"
  return str:gsub(pat, "%%%1")
end

---@class Path: PathInstance
local Path = {}
Path.__index = Path

---@param path string
---@param child string?
---@return Path
function Path.new(path, child)
  ---@class PathInstance
  local instance = {
    path = path,
  }
  if child then
    instance.path = instance.path .. "/" .. child
  end
  ---@type Path
  return setmetatable(instance, Path)
end

function Path:__tostring()
  return self.path
end

---@return boolean
function Path:is_exists()
  return uv.fs_stat(self.path)
end

---@param rhs string
function Path:__div(rhs)
  return Path.new(self.path, rhs)
end

function Path:get_stem_ext()
  return self.path:match "(.-)%.([^%.]*)$"
end

---@return string?
---@return string?
function Path:get_dir_base()
  return self.path:match "(.-)/([^/]*)$"
end

---@return Path?
function Path:parent()
  local dir, _ = self:get_dir_base()
  if dir then
    return Path.new(dir)
  end
end

function Path:rmdir()
  uv.fs_rmdir(self.path)
end

---@param path Path
---@return Path
function Path:make_relative_path(path)
  local base = self.path .. "/"
  local sub = string.sub(path.path, 1, #self.path + 1)
  assert(sub == base)
  local ret = string.sub(path.path, #base + 1)
  -- print(base, path, sub, sub == base, ret)
  return Path.new(ret)
end

---@param callback fun(string)
---@param indent string?
function Path:traverse(callback, indent)
  indent = indent and indent or ""
  local fs, err, msg = uv.fs_scandir(self.path)
  assert(not err, msg)
  if fs then
    while true do
      local name, type, err, msg = uv.fs_scandir_next(fs)
      if not name then
        break
      end
      assert(not err, msg)
      -- print(string.format("%s%s%s", indent, get_icon(type), name))
      local child = Path.new(self.path, name)
      if type == "file" then
        callback(child)
      elseif type == "directory" then
        child:traverse(callback, indent .. "  ")
      end
    end
  end
end

---@return string?
function Path:read()
  local r = io.open(self.path, "r")
  assert(r, "read: fail to open: " .. self.path)
  if r then
    local content = r:read "*a"
    r:close()
    return content
  end
end

---@param data string
function Path:write(data)
  local dir = self:parent()
  assert(dir)
  if not dir:is_exists() then
    dir:mkdir()
  end

  local w = io.open(self.path, "w")
  assert(w, "write: fail to open: " .. self.path)
  if w then
    w:write(data)
    w:close()
  end
end

function Path:mkdir()
  print("mkdir", self.path)
  while true do
    local parent = self:parent()
    if not parent then
      break
    end
    if parent:is_exists() then
      break
    end
    parent:mkdir()
  end
  uv.fs_mkdir(self.path, tonumber("755", 8))
end

return Path